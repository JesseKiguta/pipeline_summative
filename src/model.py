import numpy as np
import joblib
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, log_loss, classification_report, confusion_matrix
from preprocessing import preprocess_data  # Import the preprocessing function

def prepare_data(df, target_columns):
    """Prepare features and target variable for modeling."""
    X = df.drop(columns=target_columns + ['PM2.5'])
    y = df[target_columns]
    y_rf = np.argmax(y.values, axis=1)  # Convert one-hot encoding to class labels
    return X, y_rf

def split_data(X, y_rf, test_size=0.2, random_state=42):
    """Split the data into training and testing sets."""
    return train_test_split(X, y_rf, test_size=test_size, random_state=random_state)

def train_random_forest(X_train, y_train):
    """Train a Random Forest model using Grid Search for hyperparameter tuning."""
    rf = RandomForestClassifier()

    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'max_features': ['sqrt', 'log2']
    }

    grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='neg_log_loss', n_jobs=-1)
    grid_search.fit(X_train, y_train)

    return grid_search.best_estimator_, grid_search.best_params()

def save_model(model, filename="best_rf_model.pkl"):
    """Save the trained model to a file."""
    joblib.dump(model, filename)
    print(f"Model saved as {filename}")

def evaluate_model(model, X_test, y_test, class_labels):
    """Evaluate the model's performance on the test set."""
    y_pred = model.predict(X_test)
    y_pred_prob = model.predict_proba(X_test)

    print(f'Accuracy: {accuracy_score(y_test, y_pred):.4f}')
    print(f'Log Loss: {log_loss(y_test, y_pred_prob):.4f}')
    print(classification_report(y_test, y_pred, target_names=class_labels))

    cm = confusion_matrix(y_test, y_pred)

    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=class_labels, yticklabels=class_labels)
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.title('Confusion Matrix')
    plt.show()

    return y_test, y_pred

if __name__ == "__main__":
    # Example usage
    file_path = 'data/updated_pollution_dataset.csv' 
    categorical_columns = ['Air Quality']
    target_columns = ['Air Quality_Good', 'Air Quality_Moderate', 'Air Quality_Poor', 'Air Quality_Hazardous']
    
    # Preprocess the data to get df_encoded
    df_encoded = preprocess_data(file_path, categorical_columns, missing_value_strategy='drop')
    
    # Prepare the data for modeling
    X, y_rf = prepare_data(df_encoded, target_columns)
    X_train, X_test, y_train_rf, y_test_rf = split_data(X, y_rf)
    
    best_model, best_params = train_random_forest(X_train, y_train_rf)
    print(f"Best Parameters: {best_params}")
    
    save_model(best_model)
    
    class_labels = ["Good", "Moderate", "Poor", "Hazardous"]
    y_test, y_pred = evaluate_model(best_model, X_test, y_test_rf, class_labels)