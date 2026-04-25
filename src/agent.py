
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

# completion = client.chat.completions.create(
#     model="mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
#     messages=[
#         {
#             "role": "user",
#             "content": "What is the capital of France?"
#         }
#     ],
# )

# print(completion.choices[0].message)

# token usage
# print("Prompt tokens:", completion.usage.prompt_tokens)
# print("Completion tokens:", completion.usage.completion_tokens)
# print("Total tokens:", completion.usage.total_tokens)


class WaterIntakeAgent:
    def __init__(self):
        self.history = []
        
    def analyze_intake(self, intake_ml, age, gender, activity_level, curr_temp):
        
        prompt = f"""In one short paragraph, analyze if {intake_ml} ml daily water intake is sufficient for a healthy adult, 
        with the following characteristics: age {age}, gender {gender}, physical activity level {activity_level}, 
        and climate {curr_temp}. Avoid disclaimers and repetition. Adjust context in 100 tokens or less."""
        
        response = client.chat.completions.create(
            model="mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
            max_tokens=150,
            temperature=0.5,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ], 
        )
        return response.choices[0].message.content
    
    
    
 # testing   
if __name__ == "__main__":
    agent = WaterIntakeAgent()
    intake_ml = 1500
    age = 30
    gender = "male"
    activity_level = "moderate"
    curr_temp = "40°C"
    insights = agent.analyze_intake(intake_ml, age, gender, activity_level, curr_temp)
    print(insights)