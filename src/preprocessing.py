import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def load_data(file_path):
    """Load the dataset from a CSV file."""
    df = pd.read_csv(file_path)
    return df

def check_missing_values(df):
    """Check for missing values in the DataFrame."""
    missing_values = df.isnull().sum()
    print("Missing values in each column:\n", missing_values)
    return missing_values

def encode_categorical_features(df, categorical_columns):
    """Encode categorical features using one-hot encoding."""
    df_encoded = pd.get_dummies(df, columns=categorical_columns, drop_first=False)
    return df_encoded

def plot_correlation_matrix(df):
    """Plot the correlation matrix of the DataFrame."""
    plt.figure(figsize=(12, 8))
    sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()

def handle_missing_values(df, strategy='drop'):
    """Handle missing values in the DataFrame."""
    if strategy == 'drop':
        df = df.dropna()
    elif strategy == 'mean':
        df.fillna(df.mean(), inplace=True)
    elif strategy == 'median':
        df.fillna(df.median(), inplace=True)
    elif strategy == 'mode':
        for column in df.select_dtypes(include=['object']).columns:
            df[column].fillna(df[column].mode()[0], inplace=True)
    return df

def preprocess_data(file_path, categorical_columns, missing_value_strategy='drop'):
    """Main function to preprocess the data."""
    df = load_data(file_path)
    print("Initial shape of the DataFrame:", df.shape)
    
    check_missing_values(df)
    
    df = handle_missing_values(df, strategy=missing_value_strategy)
    print("Shape after handling missing values:", df.shape)
    
    df_encoded = encode_categorical_features(df, categorical_columns)
    print("Shape after encoding categorical features:", df_encoded.shape)
    
    plot_correlation_matrix(df_encoded)
    
    return df_encoded

if __name__ == "__main__":
    # Example usage
    file_path = 'data/updated_pollution_dataset.csv'
    categorical_columns = ['Air Quality']
    df_preprocessed = preprocess_data(file_path, categorical_columns, missing_value_strategy='drop')