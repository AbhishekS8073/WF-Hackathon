import React, { useEffect, useState } from "react";
import { CreditCard, Star, Award, Check } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { useBankStore } from "../store/useStore";

const customerId='3';

// Fallback image URL if the main one fails to load
const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export function CardsPage() {
  const [recommend, setRecommend] = useState<any>();
  const cards = [
    {
      id: "1",
      type: "credit",
      number: "**** **** **** 1234",
      expiryDate: "12/25",
      name: "John Doe",
      limit: 10000,
      balance: 2500,
    },
    {
      id: "2",
      type: "debit",
      number: "**** **** **** 5678",
      expiryDate: "06/26",
      name: "John Doe",
      balance: 15000,
    },
  ]

  const offers = [
    {
      id: "1",
      title: "Elite Dining Rewards",
      description: "5% on dining, 2% on groceries. 10x points on restaurants.",
      image:
        "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Dining",
      annual_fee: 999,
      cashback: "5% on dining, 2% on groceries",
      reward_points: "10x on restaurants",
      benefits: [
        "Complimentary fine-dining vouchers",
        "Priority reservations at premium restaurants",
        "No surcharge on food delivery platforms",
      ],
      min_income_required: 500000,
    },
    {
      id: "2",
      title: "Global Travel Explorer",
      description:
        "5% on flight and hotel bookings. 15x points on international spends.",
      image:
        "https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Travel",
      annual_fee: 2999,
      cashback: "5% on flight and hotel bookings",
      reward_points: "15x on international spends",
      benefits: [
        "Complimentary airport lounge access",
        "Zero forex markup",
        "Travel insurance and trip cancellation cover",
      ],
      min_income_required: 700000,
    },
    {
      id: "3",
      title: "Lifestyle Premium Card",
      description: "3% on shopping, entertainment and streaming services.",
      image:
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Lifestyle",
      annual_fee: 1499,
      cashback: "3% on shopping and entertainment",
      reward_points: "5x on streaming services",
      benefits: [
        "Complimentary movie tickets monthly",
        "Buy-one-get-one on weekend shopping",
        "Exclusive brand discounts",
      ],
      min_income_required: 400000,
    },
    {
      id: "4",
      title: "Student Essentials",
      description: "No annual fee. 2% cashback on educational expenses.",
      image:
        "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Education",
      annual_fee: 0,
      cashback: "2% on educational expenses",
      reward_points: "3x on books and stationery",
      benefits: [
        "Education loan interest discounts",
        "Free educational subscriptions",
        "Internship opportunity priorities",
      ],
      min_income_required: 100000,
    },
    {
      id: "5",
      title: "Business Professional",
      description: "Premium benefits for business expenses and travel.",
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Business",
      annual_fee: 4999,
      cashback: "4% on business expenses",
      reward_points: "12x on business travel",
      benefits: [
        "Dedicated business lounge access",
        "Expense management tools",
        "Tax advisory services",
        "Extended warranty on business purchases",
      ],
      min_income_required: 1000000,
    },
  ]

  useEffect(() => {
    const fetchOffersData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recommenedOffers/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOfferAPI(data.title);
        setRecommend(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffersData();
  }, [customerId]);

  console.log(recommend);

  const [offerapi, setOfferAPI] = useState<any>();

  // Function to handle image loading errors
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#D71E28] h-8 w-8" />
        <h1 className="text-3xl font-bold">Cards</h1>
      </div>

      <Tabs.Root defaultValue="credit" className="space-y-6">
        <Tabs.List className="flex space-x-2 border-b">
          <Tabs.Trigger
            value="credit"
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-[#D71E28] border-b-2 border-transparent data-[state=active]:border-[#D71E28] data-[state=active]:text-[#D71E28]"
          >
            Credit Cards
          </Tabs.Trigger>
          <Tabs.Trigger
            value="debit"
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-[#D71E28] border-b-2 border-transparent data-[state=active]:border-[#D71E28] data-[state=active]:text-[#D71E28]"
          >
            Debit Cards
          </Tabs.Trigger>
          <Tabs.Trigger
            value="offers"
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-[#D71E28] border-b-2 border-transparent data-[state=active]:border-[#D71E28] data-[state=active]:text-[#D71E28]"
          >
            Special Offers
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="credit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards
              .filter((card) => card.type === "credit")
              .map((card) => (
                <div
                  key={card.id}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Credit Card</h3>
                      <CreditCard className="text-[#D71E28]" />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Card Number</p>
                      <p className="text-xl font-medium">{card.number}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Balance</p>
                        <p className="font-medium">${card.balance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Credit Limit</p>
                        <p className="font-medium">${card.limit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="debit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards
              .filter((card) => card.type === "debit")
              .map((card) => (
                <div
                  key={card.id}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Debit Card</h3>
                      <CreditCard className="text-[#D71E28]" />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Card Number</p>
                      <p className="text-xl font-medium">{card.number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available Balance</p>
                      <p className="font-medium">${card.balance}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="offers" className="space-y-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {offers
              .filter((offer) => offer.title === offerapi)
              .map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative h-56 bg-gray-100">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {offer.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {offer.category && (
                          <span className="bg-[#D71E28] text-white text-xs px-3 py-1 rounded-full font-medium">
                            {offer.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                  <span className="font-medium">
                    ${recommend.marketing_statement}
                  </span>
                  <br />
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      {"annual_fee" in offer && (
                        <div className="flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-[#D71E28]" />
                          <span className="font-medium">
                            ${offer.annual_fee}/yr
                          </span>
                        </div>
                      )}
                      {"cashback" in offer && offer.cashback && (
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-[#D71E28]" />
                          <span className="font-medium">{offer.cashback}</span>
                        </div>
                      )}
                    </div>

                    {offer.description && (
                      <p className="text-sm text-gray-700 mb-4 flex-grow">
                        {offer.description}
                      </p>
                    )}

                    {offer.benefits && offer.benefits.length > 0 && (
                      <div className="mt-auto">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-[#D71E28]" />
                          Key Benefits
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1.5">
                          {offer.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#D71E28] mr-1.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <button className="bg-[#D71E28] text-white w-full py-2 rounded-md text-sm font-medium hover:bg-[#c01824] transition-colors duration-200">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
function setError(message: any) {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

