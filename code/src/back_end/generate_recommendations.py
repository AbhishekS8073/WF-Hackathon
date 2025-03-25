import os
from dotenv import load_dotenv
import json
import traceback
from typing import Dict, List, Optional
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

class CreditCardRecommender:
    SYSTEM_PROMPT = """
    You are an advanced AI financial advisor specializing in hyper-personalized credit card recommendations.
    Strictly follow these guidelines:

    1. **Data Analysis**:  
    - Thoroughly analyze the user's transaction history  
    - Identify their dominant spending category (e.g., travel, dining, gaming)  
    - Detect any niche interests (e.g., K-pop, anime, sneaker collecting)  

    2. **Card Selection**:  
    - Recommend ONLY ONE credit card that maximizes rewards for their spending pattern  
    - Prioritize cards with sign-up bonuses if their spending justifies it  

    3. **Response Format**:  
    - Output MUST be valid JSON with these exact keys:  
        {  
        "id": "unique_card_identifier",  
        "title": "Full card name",  
        "description": "Concise rationale (30 words max)",  
        "category": "Primary spending category (e.g., 'travel')",  
        "annual_fee": 99,  
        "cashback": "Tiered cashback structure (e.g., '5% on gas')",  
        "reward_points": "Points system (e.g., '3X points on dining')",  
        "benefits": ["Priority boarding", "Free Uber credits"],  
        "min_income_required": 40000, 
        "why_specific_for_you": "Explains data-driven personalization (e.g., 'You spend $600/month on groceries – this card gives 6% back at supermarkets')", 
        "marketing_statement": "Meme-referenced pitch (e.g., 'Shut up and take my money!' for Futurama fans)"  
        }  

    4. **Marketing Statement Rules**:  
    - MUST reference viral memes/trends related to the user's interest  
    - Examples:  
        - Gaming: "GG! This card gives you OP loot (5% back on Steam)"  
        - Crypto: "When Lambo? Get 3X points on crypto purchases 👀"  
        - Gym rats: "Stop scrolling, start swiping! (3% back on protein)"  
    - Use emojis sparingly (max 2 per statement)  

    5. **Prohibited Actions**:  
    - Never recommend multiple cards  
    - Never omit required JSON keys  
    - Never use generic phrases like "great rewards" without specificity  
    """

    def __init__(self, api_key: str):
        """
        Initialize the credit card recommendation system with OpenRouter
        
        :param api_key: OpenRouter API key
        """
        self.client = OpenAI(
            api_key=api_key,
            base_url='https://openrouter.ai/api/v1'
        )

    def recommend_credit_card(
        self, 
        user_transactions_data: Dict, 
        credit_card_options: Dict
    ) -> Dict:
        """
        Recommend the most suitable credit card based on user data
        
        :param user_transactions_data: User's transaction history and profile
        :param credit_card_options: Available credit card options
        :return: Recommended credit card as a dictionary
        """
        try:
            # Prepare the recommendation request
            response = self.client.chat.completions.create(
                model='deepseek/deepseek-chat-v3-0324:free',
                response_format={'type': 'json_object'},
                messages=[
                    {
                        'role': 'system', 
                        'content': self.SYSTEM_PROMPT
                    },
                    {
                        'role': 'user',
                        'content': json.dumps({
                            'user_transactions_data': user_transactions_data,
                            'credit_card_options': credit_card_options,
                            'detailed_instructions': '''
                                CRITICAL: Your response MUST be a VALID JSON object.
                                - Do NOT add any text before or after the JSON
                                - Ensure all required fields are present
                                - Use appropriate data types
                                - If no perfect match, choose the closest option
                            '''
                        })
                    }
                ],
                temperature=0.7,
                max_tokens=500,
                top_p=0.9,
                frequency_penalty=0.5,
                presence_penalty=0.5
            )

            # Extract and clean the response content
            raw_content = response.choices[0].message.content or ''
            print("Raw API Response:", raw_content)  # Debug print

            # Attempt to parse the JSON
            try:
                recommendation = json.loads(raw_content.strip())
            except json.JSONDecodeError as json_error:
                # print(f"JSON Parsing Error: {json_error}")
                # print("Problematic Content:", repr(raw_content))
                
                # Attempt to extract JSON from the content
                import re
                json_match = re.search(r'\{.*\}', raw_content, re.DOTALL)
                if json_match:
                    try:
                        recommendation = json.loads(json_match.group(0))
                    except Exception as extract_error:
                        print(f"JSON Extraction Error: {extract_error}")
                        raise
                else:
                    raise

            return recommendation

        except Exception as error:
            print(f'Credit Card Recommendation Error: {error}')
            print(traceback.format_exc())  # Print full traceback
            raise

    def validate_recommendation(self, recommendation: Dict) -> bool:
        """
        Validate the structure of the credit card recommendation
        
        :param recommendation: Recommended credit card dictionary
        :return: Whether the recommendation is valid
        """
        required_keys = [
            'id', 'title', 'description', 
            'category', 'annual_fee', 
            'cashback', 'reward_points', 
            'benefits', 'min_income_required'
        ]
        
        # Detailed validation
        is_valid = all(key in recommendation for key in required_keys)
        
        if not is_valid:
            print("Missing keys in recommendation:")
            for key in required_keys:
                if key not in recommendation:
                    print(f"- {key}")
        
        return is_valid
    
user_interests = [
    "Technology",
    "Science",
    "Movies & TV Shows",
    "Music",
    "Books & Literature",
    "Sports",
    "Gaming",
    "Travel",
    "Food & Cooking",
    "Fitness & Health",
    "Finance & Investing",
    "Business & Entrepreneurship",
    "Self-Improvement",
    "Fashion & Style",
    "Photography",
    "Cars & Automobiles",
    "Art & Design",
    "Education & Learning",
    "Mental Health & Wellness",
    "Social Media & Influencers"
]


def main():
    # Sample user transactions data
    user_transactions_data = {
        "user_id": "12345",
        "transactions": [
            {"amount": 5000, "category": "Travel", "merchant": "Airline", "date": "2025-06-15"},
            {"amount": 8000, "category": "Entertainment", "merchant": "Airline2", "date": "2025-08-15"},
            {"amount": 3000, "category": "Bussiness", "merchant": "Airline3", "date": "2025-12-15"},
            {"amount": 1800, "category": "Dining", "merchant": "Restaurant", "date": "2025-03-10"},
            {"amount": 350, "category": "Shopping", "merchant": "Luxury Store", "date": "2025-03-08"}
        ],
        "credit_score": 780,
        "current_card": "XYZ Bank Gold",
        "overdue": False,
        "credit_utilization": 40,
        "user_interest": ["Movies"]
    }

    # Sample credit card options
    credit_card_options = {
        "credit_cards": [
            {
                "card_name": "Elite Dining Rewards",
                "category": "Dining",
                "annual_fee": 999,
                "cashback": "5% on dining, 2% on groceries",
                "reward_points": "10x on restaurants",
                "benefits": [
                "Complimentary fine-dining vouchers",
                "Priority reservations at premium restaurants",
                "No surcharge on food delivery platforms"
                ],
                "min_income_required": 500000,
                "bank": "XYZ Bank"
            },
            {
                "card_name": "Global Travel Explorer",
                "category": "Travel",
                "annual_fee": 2999,
                "cashback": "5% on flight and hotel bookings",
                "reward_points": "15x on international spends",
                "benefits": [
                "Complimentary airport lounge access",
                "Zero forex markup",
                "Travel insurance and trip cancellation cover"
                ],
                "min_income_required": 700000,
                "bank": "ABC Bank"
            },
            {
                "card_name": "Luxury Prestige Platinum",
                "category": "Luxury",
                "annual_fee": 4999,
                "cashback": "3% on premium brands",
                "reward_points": "20x on luxury shopping",
                "benefits": [
                "Personalized concierge service",
                "Access to exclusive fashion events",
                "Free business-class flight upgrade once a year"
                ],
                "min_income_required": 1000000,
                "bank": "Premium FinCorp"
            },
            {
                "card_name": "Smart Shopper Cashback",
                "category": "Shopping",
                "annual_fee": 799,
                "cashback": "10% on Amazon, Flipkart, Myntra",
                "reward_points": "5x on all retail shopping",
                "benefits": [
                "Buy now, pay later with 0% interest",
                "Extra warranty on electronics",
                "Exclusive partner discounts"
                ],
                "min_income_required": 400000,
                "bank": "Retail Bank"
            },
            {
                "card_name": "Fuel Saver Gold",
                "category": "Fuel",
                "annual_fee": 499,
                "cashback": "5% on fuel transactions",
                "reward_points": "3x on fuel and toll payments",
                "benefits": [
                "1% fuel surcharge waiver",
                "Free road assistance and car insurance discounts",
                "Monthly fuel vouchers"
                ],
                "min_income_required": 300000,
                "bank": "Petro Finance"
            },
            {
                "card_name": "Online Spender Pro",
                "category": "Online",
                "annual_fee": 999,
                "cashback": "7% on OTT, food delivery & gaming",
                "reward_points": "8x on e-commerce & digital payments",
                "benefits": [
                "Free Netflix & Spotify subscription",
                "No-cost EMI on gadgets",
                "Cyber fraud protection"
                ],
                "min_income_required": 450000,
                "bank": "DigitalPay Bank"
            }
        ]
    }

    # Initialize recommender
    recommender = CreditCardRecommender(
        api_key=os.getenv('OPENROUTER_API_KEY', '')  # Use OpenRouter API key from environment
    )

    try:
        # Get recommendation
        recommendation = recommender.recommend_credit_card(
            user_transactions_data, 
            credit_card_options
        )

        # Validate recommendation
        if recommender.validate_recommendation(recommendation):
            print("Recommended Credit Card:")
            print(json.dumps(recommendation, indent=2))
        else:
            print("Invalid recommendation format")

    except Exception as e:
        print(f"Recommendation process failed: {e}")
        print(traceback.format_exc())

if __name__ == "__main__":
    main()