import json
import os
import time
from flask_app import app
import google_play_endpoints
import spotify_endpoints

# @app.route('/api/comments', methods=['GET', 'POST'])
# def comments_handler():
#     with open('comments.json', 'r') as f:
#         comments = json.loads(f.read())

#     if request.method == 'POST':
#         new_comment = request.form.to_dict()
#         new_comment['id'] = int(time.time() * 1000)
#         comments.append(new_comment)

#         with open('comments.json', 'w') as f:
#             f.write(json.dumps(comments, indent=4, separators=(',', ': ')))

#     return Response(
#         json.dumps(comments),
#         mimetype='application/json',
#         headers={
#             'Cache-Control': 'no-cache',
#             'Access-Control-Allow-Origin': '*'
#         }
#     )


if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)), debug=True)
