import pandas as pd
import numpy as np
import pickle
import os
from datetime import datetime
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                            f1_score, confusion_matrix, classification_report,
                            roc_auc_score, roc_curve)
import warnings
warnings.filterwarnings('ignore')


class CustomerChurnPredictor:
    def __init__(self):
        self.models = {}
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_names = []
        self.best_model = None
        self.best_model_name = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.model_file = "churn_model.pkl"
        self.scaler_file = "churn_scaler.pkl"
        self.encoders_file = "churn_encoders.pkl"
        self.churn_column_name = 'churn'  # Store detected churn column name
        
    def generate_sample_data(self, n_samples=1000):
        """Generate sample customer data for demonstration"""
        np.random.seed(42)
        
        data = {
            'customer_id': [f'CUST{i:05d}' for i in range(1, n_samples + 1)],
            'age': np.random.randint(18, 80, n_samples),
            'gender': np.random.choice(['Male', 'Female'], n_samples),
            'tenure': np.random.randint(0, 72, n_samples),  # months
            'phone_service': np.random.choice(['Yes', 'No'], n_samples, p=[0.9, 0.1]),
            'multiple_lines': np.random.choice(['Yes', 'No', 'No phone service'], n_samples, p=[0.4, 0.5, 0.1]),
            'internet_service': np.random.choice(['DSL', 'Fiber optic', 'No'], n_samples, p=[0.35, 0.45, 0.2]),
            'online_security': np.random.choice(['Yes', 'No', 'No internet service'], n_samples, p=[0.3, 0.5, 0.2]),
            'online_backup': np.random.choice(['Yes', 'No', 'No internet service'], n_samples, p=[0.35, 0.45, 0.2]),
            'device_protection': np.random.choice(['Yes', 'No', 'No internet service'], n_samples, p=[0.35, 0.45, 0.2]),
            'tech_support': np.random.choice(['Yes', 'No', 'No internet service'], n_samples, p=[0.3, 0.5, 0.2]),
            'streaming_tv': np.random.choice(['Yes', 'No', 'No internet service'], n_samples, p=[0.4, 0.4, 0.2]),
            'streaming_movies': np.random.choice(['Yes', 'No', 'No internet service'], n_samples, p=[0.4, 0.4, 0.2]),
            'contract': np.random.choice(['Month-to-month', 'One year', 'Two year'], n_samples, p=[0.55, 0.21, 0.24]),
            'paperless_billing': np.random.choice(['Yes', 'No'], n_samples, p=[0.6, 0.4]),
            'payment_method': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'], 
                                              n_samples, p=[0.34, 0.19, 0.22, 0.25]),
            'monthly_charges': np.round(np.random.uniform(18, 120, n_samples), 2),
            'total_charges': np.round(np.random.uniform(0, 8000, n_samples), 2)
        }
        
        df = pd.DataFrame(data)
        
        # Create churn based on patterns
        churn_prob = (
            (df['tenure'] < 12) * 0.4 +
            (df['contract'] == 'Month-to-month') * 0.3 +
            (df['monthly_charges'] > 80) * 0.2 +
            (df['online_security'] == 'No') * 0.1 +
            np.random.random(n_samples) * 0.1
        )
        df['churn'] = (churn_prob > 0.5).astype(int)
        
        return df
    
    def detect_churn_column(self, df):
        """Detect churn column name from various possible names"""
        possible_names = ['churn', 'Churn', 'CHURN', 'churned', 'Churned', 
                         'exited', 'Exited', 'EXITED', 'target', 'Target']
        
        for col in df.columns:
            col_lower = col.lower().strip()
            if col_lower in [name.lower() for name in possible_names]:
                return col
        
        # If not found, check for binary columns (0/1 or Yes/No)
        for col in df.columns:
            dtype_str = str(df[col].dtype)
            if 'int' in dtype_str or 'bool' in dtype_str:
                unique_vals = df[col].unique()
                if len(unique_vals) == 2 and set(unique_vals).issubset({0, 1, True, False}):
                    return col
        
        return None
    
    def normalize_churn_column(self, df, churn_col):
        """Normalize churn column to binary 0/1 format"""
        if churn_col is None:
            return df, None
        
        df = df.copy()
        
        # Check current format
        unique_vals = df[churn_col].unique()
        
        # If already 0/1, just rename
        if set(unique_vals).issubset({0, 1}):
            if churn_col != 'churn':
                df = df.rename(columns={churn_col: 'churn'})
            return df, 'churn'
        
        # If Yes/No or True/False, convert to 0/1
        if set(unique_vals).issubset({'Yes', 'No', 'yes', 'no', True, False}):
            df[churn_col] = df[churn_col].apply(
                lambda x: 1 if str(x).lower() in ['yes', 'true', '1'] else 0
            )
            if churn_col != 'churn':
                df = df.rename(columns={churn_col: 'churn'})
            return df, 'churn'
        
        return df, churn_col
    
    def load_data(self, filepath=None):
        """Load data from CSV file or generate sample data"""
        if filepath and os.path.exists(filepath):
            print(f"Loading data from {filepath}...")
            df = pd.read_csv(filepath)
            
            # Detect and normalize churn column
            churn_col = self.detect_churn_column(df)
            if churn_col:
                df, self.churn_column_name = self.normalize_churn_column(df, churn_col)
                print(f"Detected churn column: '{churn_col}' (normalized to 'churn')")
            else:
                print("⚠ Warning: Could not detect churn column automatically!")
                print(f"Available columns: {', '.join(df.columns.tolist())}")
                churn_col = input("Enter churn column name (or press Enter to skip): ").strip()
                if churn_col and churn_col in df.columns:
                    df, self.churn_column_name = self.normalize_churn_column(df, churn_col)
                else:
                    print("⚠ No valid churn column found. Please ensure your data has a churn column.")
                    self.churn_column_name = None
        else:
            print("No data file found. Generating sample data...")
            df = self.generate_sample_data(2000)
            print(f"Generated {len(df)} sample records.")
            self.churn_column_name = 'churn'
        
        return df
    
    def preprocess_data(self, df):
        """Preprocess and encode categorical variables"""
        df = df.copy()
        
        # Drop customer_id if present (not useful for prediction)
        id_columns = [col for col in df.columns if 'id' in col.lower() and col.lower() != 'churn']
        for col in id_columns:
            df = df.drop(col, axis=1)
        
        # Separate features and target
        churn_col = self.churn_column_name if hasattr(self, 'churn_column_name') and self.churn_column_name else 'churn'
        
        if churn_col not in df.columns:
            # Try to detect again
            churn_col = self.detect_churn_column(df)
            if churn_col:
                df, self.churn_column_name = self.normalize_churn_column(df, churn_col)
                churn_col = self.churn_column_name
        
        if churn_col and churn_col in df.columns:
            y = df[churn_col]
            X = df.drop(churn_col, axis=1)
        else:
            raise ValueError(f"Churn column '{churn_col}' not found in data. Available columns: {', '.join(df.columns.tolist())}")
        
        # Handle missing values
        X = X.fillna(X.mode().iloc[0] if not X.select_dtypes(include=[np.number]).empty else 0)
        
        # Encode categorical variables
        categorical_cols = X.select_dtypes(include=['object']).columns
        
        for col in categorical_cols:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                X[col] = self.label_encoders[col].fit_transform(X[col].astype(str))
            else:
                # Handle new categories during prediction
                known_classes = set(self.label_encoders[col].classes_)
                X[col] = X[col].astype(str).apply(
                    lambda x: x if x in known_classes else self.label_encoders[col].classes_[0]
                )
                X[col] = self.label_encoders[col].transform(X[col])
        
        # Store feature names
        self.feature_names = X.columns.tolist()
        
        # Scale numerical features
        X_scaled = self.scaler.fit_transform(X)
        X_scaled = pd.DataFrame(X_scaled, columns=X.columns)
        
        return X_scaled, y
    
    def train_models(self, X, y, test_size=0.2, random_state=42):
        """Train multiple ML models and select the best one"""
        print("\n" + "="*60)
        print("TRAINING MACHINE LEARNING MODELS")
        print("="*60)
        
        # Split data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )
        
        print(f"Training set size: {len(self.X_train)}")
        print(f"Test set size: {len(self.X_test)}")
        print(f"Churn rate in training set: {self.y_train.mean():.2%}")
        
        # Initialize models
        self.models = {
            'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
            'Gradient Boosting': GradientBoostingClassifier(random_state=42),
            'SVM': SVC(probability=True, random_state=42)
        }
        
        results = {}
        
        # Train each model
        for name, model in self.models.items():
            print(f"\nTraining {name}...")
            model.fit(self.X_train, self.y_train)
            
            # Predictions
            y_pred = model.predict(self.X_test)
            y_pred_proba = model.predict_proba(self.X_test)[:, 1]
            
            # Metrics
            accuracy = accuracy_score(self.y_test, y_pred)
            precision = precision_score(self.y_test, y_pred)
            recall = recall_score(self.y_test, y_pred)
            f1 = f1_score(self.y_test, y_pred)
            auc = roc_auc_score(self.y_test, y_pred_proba)
            
            results[name] = {
                'model': model,
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1': f1,
                'auc': auc,
                'predictions': y_pred,
                'probabilities': y_pred_proba
            }
            
            print(f"  Accuracy: {accuracy:.4f}")
            print(f"  Precision: {precision:.4f}")
            print(f"  Recall: {recall:.4f}")
            print(f"  F1-Score: {f1:.4f}")
            print(f"  AUC-ROC: {auc:.4f}")
        
        # Select best model based on F1 score (balanced metric)
        self.best_model_name = max(results.keys(), key=lambda x: results[x]['f1'])
        self.best_model = results[self.best_model_name]['model']
        
        print("\n" + "="*60)
        print(f"BEST MODEL: {self.best_model_name}")
        print(f"F1-Score: {results[self.best_model_name]['f1']:.4f}")
        print("="*60)
        
        return results
    
    def evaluate_model(self, model_name=None):
        """Evaluate the best model with detailed metrics"""
        if model_name is None:
            model = self.best_model
            model_name = self.best_model_name
        else:
            model = self.models[model_name]
        
        if model is None:
            print("No model trained yet!")
            return
        
        y_pred = model.predict(self.X_test)
        y_pred_proba = model.predict_proba(self.X_test)[:, 1]
        
        print("\n" + "="*60)
        print(f"DETAILED EVALUATION: {model_name}")
        print("="*60)
        
        # Confusion Matrix
        cm = confusion_matrix(self.y_test, y_pred)
        print("\nConfusion Matrix:")
        print(f"                Predicted")
        print(f"              No    Yes")
        print(f"Actual No   {cm[0][0]:4d}  {cm[0][1]:4d}")
        print(f"       Yes  {cm[1][0]:4d}  {cm[1][1]:4d}")
        
        # Classification Report
        print("\nClassification Report:")
        print(classification_report(self.y_test, y_pred, target_names=['No Churn', 'Churn']))
        
        # Metrics
        accuracy = accuracy_score(self.y_test, y_pred)
        precision = precision_score(self.y_test, y_pred)
        recall = recall_score(self.y_test, y_pred)
        f1 = f1_score(self.y_test, y_pred)
        auc = roc_auc_score(self.y_test, y_pred_proba)
        
        print("\nPerformance Metrics:")
        print(f"  Accuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
        print(f"  Precision: {precision:.4f} ({precision*100:.2f}%)")
        print(f"  Recall:    {recall:.4f} ({recall*100:.2f}%)")
        print(f"  F1-Score:  {f1:.4f} ({f1*100:.2f}%)")
        print(f"  AUC-ROC:   {auc:.4f} ({auc*100:.2f}%)")
        
        return {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1': f1,
            'auc': auc,
            'confusion_matrix': cm
        }
    
    def get_feature_importance(self, top_n=10):
        """Get feature importance from tree-based models"""
        if self.best_model_name in ['Random Forest', 'Gradient Boosting']:
            importances = self.best_model.feature_importances_
            feature_importance = pd.DataFrame({
                'feature': self.feature_names,
                'importance': importances
            }).sort_values('importance', ascending=False)
            
            print("\n" + "="*60)
            print(f"TOP {top_n} MOST IMPORTANT FEATURES")
            print("="*60)
            for idx, row in feature_importance.head(top_n).iterrows():
                print(f"{row['feature']:25s}: {row['importance']:.4f}")
            
            return feature_importance
        else:
            print("Feature importance only available for tree-based models (Random Forest, Gradient Boosting)")
            return None
    
    def predict_churn(self, customer_data):
        """Predict churn for a single customer or batch of customers"""
        if self.best_model is None:
            print("No model trained yet! Please train a model first.")
            return None
        
        if not self.feature_names:
            print("No feature names available! Please train a model first.")
            return None
        
        # Convert to DataFrame if needed
        if isinstance(customer_data, dict):
            customer_data = pd.DataFrame([customer_data])
        elif not isinstance(customer_data, pd.DataFrame):
            raise ValueError("Input must be a dictionary or DataFrame")
        
        # Create a DataFrame with the correct feature names and order
        df = pd.DataFrame(index=range(len(customer_data)))
        
        # Map input columns to expected feature names (case-insensitive matching)
        input_cols_lower = {col.lower(): col for col in customer_data.columns}
        feature_cols_lower = {col.lower(): col for col in self.feature_names}
        
        # Fill in features from input data
        for feat_name in self.feature_names:
            feat_lower = feat_name.lower()
            
            # Try exact match first
            if feat_name in customer_data.columns:
                df[feat_name] = customer_data[feat_name]
            # Try case-insensitive match
            elif feat_lower in input_cols_lower:
                df[feat_name] = customer_data[input_cols_lower[feat_lower]]
            # Try partial match (e.g., "Age" matches "age")
            else:
                # Find best match
                matched = False
                for input_col in customer_data.columns:
                    if input_col.lower() == feat_lower or input_col.lower().replace('_', ' ') == feat_lower.replace('_', ' '):
                        df[feat_name] = customer_data[input_col]
                        matched = True
                        break
                
                # If no match found, use default value
                if not matched:
                    # Use median for numerical, mode for categorical
                    if feat_name in self.label_encoders:
                        # Categorical - use first encoded value
                        df[feat_name] = 0
                    else:
                        # Numerical - use 0
                        df[feat_name] = 0
        
        # Encode categorical variables
        categorical_cols = df.select_dtypes(include=['object']).columns
        
        for col in categorical_cols:
            if col in self.label_encoders:
                known_classes = set(self.label_encoders[col].classes_)
                df[col] = df[col].astype(str).apply(
                    lambda x: x if x in known_classes else self.label_encoders[col].classes_[0]
                )
                df[col] = self.label_encoders[col].transform(df[col])
        
        # Ensure all features are numeric
        for col in df.columns:
            if df[col].dtype == 'object':
                df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
        
        # Ensure correct order and all features present
        df = df[self.feature_names]
        
        # Scale features
        df_scaled = self.scaler.transform(df)
        df_scaled = pd.DataFrame(df_scaled, columns=self.feature_names)
        
        # Predict
        predictions = self.best_model.predict(df_scaled)
        probabilities = self.best_model.predict_proba(df_scaled)[:, 1]
        
        results = []
        for i in range(len(customer_data)):
            results.append({
                'churn_prediction': 'Yes' if predictions[i] == 1 else 'No',
                'churn_probability': probabilities[i],
                'risk_level': self._get_risk_level(probabilities[i])
            })
        
        return results if len(results) > 1 else results[0]
    
    def _get_risk_level(self, probability):
        """Categorize churn risk based on probability"""
        if probability < 0.3:
            return "Low"
        elif probability < 0.6:
            return "Medium"
        else:
            return "High"
    
    def save_model(self):
        """Save the trained model, scaler, and encoders"""
        try:
            with open(self.model_file, 'wb') as f:
                pickle.dump({
                    'model': self.best_model,
                    'model_name': self.best_model_name,
                    'feature_names': self.feature_names
                }, f)
            
            with open(self.scaler_file, 'wb') as f:
                pickle.dump(self.scaler, f)
            
            with open(self.encoders_file, 'wb') as f:
                pickle.dump(self.label_encoders, f)
            
            print(f"\n✓ Model saved successfully!")
            print(f"  Model: {self.model_file}")
            print(f"  Scaler: {self.scaler_file}")
            print(f"  Encoders: {self.encoders_file}")
            return True
        except Exception as e:
            print(f"Error saving model: {e}")
            return False
    
    def load_model(self):
        """Load a previously trained model"""
        try:
            if not all(os.path.exists(f) for f in [self.model_file, self.scaler_file, self.encoders_file]):
                print("No saved model found!")
                return False
            
            with open(self.model_file, 'rb') as f:
                model_data = pickle.load(f)
                self.best_model = model_data['model']
                self.best_model_name = model_data['model_name']
                self.feature_names = model_data['feature_names']
            
            with open(self.scaler_file, 'rb') as f:
                self.scaler = pickle.load(f)
            
            with open(self.encoders_file, 'rb') as f:
                self.label_encoders = pickle.load(f)
            
            print(f"\n✓ Model loaded successfully!")
            print(f"  Model: {self.best_model_name}")
            return True
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def get_sample_customer_input(self):
        """Get sample customer data structure based on actual feature names"""
        if not self.feature_names:
            # Default sample if no features available
            return {
                'age': 45,
                'gender': 'Male',
                'tenure': 12,
                'phone_service': 'Yes',
                'multiple_lines': 'Yes',
                'internet_service': 'Fiber optic',
                'online_security': 'No',
                'online_backup': 'No',
                'device_protection': 'No',
                'tech_support': 'No',
                'streaming_tv': 'Yes',
                'streaming_movies': 'Yes',
                'contract': 'Month-to-month',
                'paperless_billing': 'Yes',
                'payment_method': 'Electronic check',
                'monthly_charges': 95.5,
                'total_charges': 1200.0
            }
        
        # Create sample based on actual feature names
        sample = {}
        for feat_name in self.feature_names:
            feat_lower = feat_name.lower()
            
            # Set default values based on feature name patterns
            if 'age' in feat_lower:
                sample[feat_name] = 45
            elif 'gender' in feat_lower:
                sample[feat_name] = 'Male'
            elif 'tenure' in feat_lower:
                sample[feat_name] = 12
            elif 'payment' in feat_lower and 'delay' in feat_lower:
                sample[feat_name] = 0
            elif 'support' in feat_lower and 'call' in feat_lower:
                sample[feat_name] = 0
            elif 'usage' in feat_lower or 'frequency' in feat_lower:
                sample[feat_name] = 5.0
            elif 'contract' in feat_lower:
                sample[feat_name] = 'Month-to-month'
            elif 'charge' in feat_lower or 'price' in feat_lower or 'cost' in feat_lower:
                sample[feat_name] = 50.0
            elif feat_name in self.label_encoders:
                # For categorical features, use first valid value
                if len(self.label_encoders[feat_name].classes_) > 0:
                    sample[feat_name] = self.label_encoders[feat_name].classes_[0]
                else:
                    sample[feat_name] = 'Unknown'
            else:
                # Default numerical value
                sample[feat_name] = 0
        
        return sample


class ChurnPredictionSystem:
    def __init__(self):
        self.predictor = CustomerChurnPredictor()
        self.data = None
    
    def main_menu(self):
        while True:
            print("\n" + "="*60)
            print("CUSTOMER CHURN PREDICTION SYSTEM")
            print("="*60)
            print("1. Load Data")
            print("2. Train Models")
            print("3. Evaluate Models")
            print("4. View Feature Importance")
            print("5. Predict Churn (Single Customer)")
            print("6. Predict Churn (Batch)")
            print("7. Save Model")
            print("8. Load Saved Model")
            print("9. View Data Statistics")
            print("10. Exit")
            
            choice = input("\nEnter your choice: ").strip()
            
            if choice == '1':
                self.load_data_menu()
            elif choice == '2':
                self.train_models_menu()
            elif choice == '3':
                self.evaluate_models_menu()
            elif choice == '4':
                self.view_feature_importance()
            elif choice == '5':
                self.predict_single_customer()
            elif choice == '6':
                self.predict_batch_customers()
            elif choice == '7':
                self.predictor.save_model()
            elif choice == '8':
                self.predictor.load_model()
            elif choice == '9':
                self.view_data_statistics()
            elif choice == '10':
                print("\nThank you for using Customer Churn Prediction System!")
                break
            else:
                print("Invalid choice! Please try again.")
    
    def load_data_menu(self):
        print("\n--- Load Data ---")
        filepath = input("Enter CSV file path (or press Enter to generate sample data): ").strip()
        self.data = self.predictor.load_data(filepath if filepath else None)
        print(f"\n✓ Data loaded successfully!")
        print(f"  Total records: {len(self.data)}")
        
        # Check for churn column
        churn_col = self.predictor.churn_column_name
        if churn_col and churn_col in self.data.columns:
            print(f"  Features: {len(self.data.columns) - 1}")
            churn_rate = self.data[churn_col].mean()
            print(f"  Churn rate: {churn_rate:.2%}")
            print(f"  Churn column: '{churn_col}'")
        else:
            print(f"  Features: {len(self.data.columns)}")
            print(f"  ⚠ Warning: Churn column not detected!")
            print(f"  Available columns: {', '.join(self.data.columns.tolist()[:10])}")
            if len(self.data.columns) > 10:
                print(f"  ... and {len(self.data.columns) - 10} more")
    
    def train_models_menu(self):
        if self.data is None:
            print("\n⚠ No data loaded! Please load data first.")
            return
        
        print("\n--- Train Models ---")
        print("Preprocessing data...")
        X, y = self.predictor.preprocess_data(self.data)
        print("✓ Data preprocessed successfully!")
        
        self.predictor.train_models(X, y)
        print("\n✓ All models trained successfully!")
    
    def evaluate_models_menu(self):
        if self.predictor.best_model is None:
            print("\n⚠ No model trained yet! Please train models first.")
            return
        
        print("\n--- Evaluate Models ---")
        print("1. Evaluate Best Model")
        print("2. Compare All Models")
        
        choice = input("Enter choice: ").strip()
        
        if choice == '1':
            self.predictor.evaluate_model()
        elif choice == '2':
            print("\n" + "="*60)
            print("MODEL COMPARISON")
            print("="*60)
            for name in self.predictor.models.keys():
                print(f"\n{name}:")
                self.predictor.evaluate_model(name)
        else:
            print("Invalid choice!")
    
    def view_feature_importance(self):
        if self.predictor.best_model is None:
            print("\n⚠ No model trained yet! Please train models first.")
            return
        
        top_n = input("\nEnter number of top features to display (default 10): ").strip()
        top_n = int(top_n) if top_n.isdigit() else 10
        self.predictor.get_feature_importance(top_n)
    
    def predict_single_customer(self):
        if self.predictor.best_model is None:
            print("\n⚠ No model trained yet! Please train models first.")
            return
        
        if not self.predictor.feature_names:
            print("\n⚠ No feature names available! Please train models first.")
            return
        
        print("\n--- Predict Churn for Single Customer ---")
        print("Enter customer details (press Enter to use sample values):")
        print(f"\nRequired features ({len(self.predictor.feature_names)}):")
        for i, feat in enumerate(self.predictor.feature_names[:10], 1):
            print(f"  {i}. {feat}")
        if len(self.predictor.feature_names) > 10:
            print(f"  ... and {len(self.predictor.feature_names) - 10} more")
        
        sample = self.predictor.get_sample_customer_input()
        customer = {}
        
        print("\nEnter values for each feature:")
        for key, default_value in sample.items():
            if isinstance(default_value, (int, float)):
                value = input(f"{key} (default: {default_value}): ").strip()
                customer[key] = float(value) if value else default_value
            else:
                value = input(f"{key} (default: {default_value}): ").strip()
                customer[key] = value if value else default_value
        
        print("\nProcessing prediction...")
        try:
            result = self.predictor.predict_churn(customer)
            
            print("\n" + "="*60)
            print("PREDICTION RESULT")
            print("="*60)
            print(f"Churn Prediction: {result['churn_prediction']}")
            print(f"Churn Probability: {result['churn_probability']:.2%}")
            print(f"Risk Level: {result['risk_level']}")
            print("="*60)
            
            if result['churn_prediction'] == 'Yes':
                print("\n⚠ WARNING: High churn risk detected!")
                print("Recommended actions:")
                print("  - Offer retention discount")
                print("  - Provide personalized service")
                print("  - Review contract terms")
                print("  - Improve customer support")
        except Exception as e:
            print(f"\n❌ Error during prediction: {e}")
            print("\nTip: Make sure you've entered values for all required features.")
            print(f"Required features: {', '.join(self.predictor.feature_names)}")
    
    def predict_batch_customers(self):
        if self.predictor.best_model is None:
            print("\n⚠ No model trained yet! Please train models first.")
            return
        
        print("\n--- Predict Churn for Batch of Customers ---")
        filepath = input("Enter CSV file path with customer data: ").strip()
        
        if not os.path.exists(filepath):
            print("File not found!")
            return
        
        try:
            customer_data = pd.read_csv(filepath)
            print(f"Loaded {len(customer_data)} customers")
            
            print("\nProcessing predictions...")
            results = self.predictor.predict_churn(customer_data)
            
            # Convert to list if single result
            if isinstance(results, dict):
                results = [results]
            
            # Create results DataFrame
            results_df = customer_data.copy()
            results_df['churn_prediction'] = [r['churn_prediction'] for r in results]
            results_df['churn_probability'] = [r['churn_probability'] for r in results]
            results_df['risk_level'] = [r['risk_level'] for r in results]
            
            # Save results
            output_file = f"churn_predictions_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            results_df.to_csv(output_file, index=False)
            
            print(f"\n✓ Predictions completed!")
            print(f"  Results saved to: {output_file}")
            
            # Summary statistics
            churn_count = sum(1 for r in results if r['churn_prediction'] == 'Yes')
            print(f"\nSummary:")
            print(f"  Total customers: {len(results)}")
            print(f"  Predicted churn: {churn_count} ({churn_count/len(results):.2%})")
            print(f"  Low risk: {sum(1 for r in results if r['risk_level'] == 'Low')}")
            print(f"  Medium risk: {sum(1 for r in results if r['risk_level'] == 'Medium')}")
            print(f"  High risk: {sum(1 for r in results if r['risk_level'] == 'High')}")
            
        except Exception as e:
            print(f"Error processing batch: {e}")
    
    def view_data_statistics(self):
        if self.data is None:
            print("\n⚠ No data loaded! Please load data first.")
            return
        
        print("\n" + "="*60)
        print("DATA STATISTICS")
        print("="*60)
        print(f"\nTotal Records: {len(self.data)}")
        
        churn_col = self.predictor.churn_column_name
        if churn_col and churn_col in self.data.columns:
            print(f"Total Features: {len(self.data.columns) - 1}")
            
            print(f"\nChurn Distribution:")
            churn_counts = self.data[churn_col].value_counts()
            print(f"  No Churn: {churn_counts.get(0, 0)} ({churn_counts.get(0, 0)/len(self.data):.2%})")
            print(f"  Churn: {churn_counts.get(1, 0)} ({churn_counts.get(1, 0)/len(self.data):.2%})")
        else:
            print(f"Total Features: {len(self.data.columns)}")
            print(f"\n⚠ Churn column not detected!")
        
        print("\nNumerical Features Summary:")
        numerical_cols = self.data.select_dtypes(include=[np.number]).columns
        if churn_col and churn_col in numerical_cols:
            numerical_cols = numerical_cols.drop(churn_col)
        if len(numerical_cols) > 0:
            print(self.data[numerical_cols].describe())
        else:
            print("  No numerical features found.")
        
        print("\nCategorical Features Distribution:")
        categorical_cols = self.data.select_dtypes(include=['object']).columns
        if churn_col and churn_col in categorical_cols:
            categorical_cols = categorical_cols.drop(churn_col)
        if len(categorical_cols) > 0:
            for col in categorical_cols[:5]:  # Show first 5
                print(f"\n{col}:")
                print(self.data[col].value_counts().head())
        else:
            print("  No categorical features found.")
        
        print(f"\nAll Columns ({len(self.data.columns)}):")
        for i, col in enumerate(self.data.columns, 1):
            dtype = str(self.data[col].dtype)
            unique_count = self.data[col].nunique()
            print(f"  {i:2d}. {col:30s} ({dtype:10s}) - {unique_count} unique values")


def main():
    system = ChurnPredictionSystem()
    system.main_menu()


if __name__ == "__main__":
    main()

