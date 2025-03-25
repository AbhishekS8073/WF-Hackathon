from flask import Flask, jsonify
from flask_cors import CORS
import csv

app = Flask(__name__)

# Enable CORS for all routes (you can be more specific if needed)
CORS(app, origins=["http://127.0.0.1:5173"])
# Function to load users from a CSV file
def load_from_csv(file_path):
    users = []
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # # Convert string values to proper types if needed
            # row['age'] = int(row['age'])  # Convert age to integer
            users.append(row)
    return users

# Load users data from the CSV file when the app starts
users_data = load_from_csv('C:/Users/abhis/OneDrive/Desktop/Hackathon/WF-Hackathon/code/src/data/accounts.csv')
transaction_date = load_from_csv('C:/Users/abhis/OneDrive/Desktop/Hackathon/WF-Hackathon/code/src/data/transactions.csv')
cards_date = load_from_csv('C:/Users/abhis/OneDrive/Desktop/Hackathon/WF-Hackathon/code/src/data/cards.csv')

# Route to fetch user details by customer_id
@app.route('/user/<customer_id>', methods=['GET'])
def get_user_by_customer_id(customer_id):
    # Search for the user with the matching customer_id
    user = next((user for user in users_data if user["user_id"] == customer_id), None)
    
    if user:
        return jsonify(user), 200  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"}), 404  # Return error if not found
    
@app.route('/transaction/<customer_id>', methods=['GET'])
def get_transaction_by_customer_id(customer_id):
    # Search for the user with the matching customer_id
    user_transactions = [user for user in transaction_date if user["user_id"] == customer_id]
    
    if user_transactions:
        return jsonify(user_transactions), 200  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"}), 404  # Return error if not found
    
@app.route('/cards/', methods=['GET'])
def get_credit_cards_by_customer_id(customer_id):
    # Search for the user with the matching customer_id
    card_details = [card for card in cards_date]
    
    if card_details:
        return jsonify(card_details), 200  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"}), 404  # Return error if not found

if __name__ == '__main__':
    app.run(debug=True)
