import requests

users = [
    "https://www.reddit.com/user/sigtot/about.json",
    "https://www.reddit.com/user/eirikbjorn/about.json",
    "https://www.reddit.com/user/smithpeder/about.json",
    "https://www.reddit.com/user/flluka/about.json"
    ]

for user in users:
    respons = requests.get(user, headers = {'User-agent': 'your bot 0.1'})
    data = respons.json().get("data")
    print("User", data.get("name"))
    print("Post karma: ", data.get("link_karma"))
    print("Comment karma: ", data.get("comment_karma"))
    print("Gold", data.get("is_gold"))
