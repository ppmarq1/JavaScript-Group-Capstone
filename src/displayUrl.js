import commentsUrl from './commentsUrl.js';

export default class Movies {
    static countComment = (id) => {
        commentsUrl.getComments(id).then((data) => {
          const display = document.querySelector('.display-comments');
          const count = document.querySelector('.comment-count');
          count.textContent = `Comments (${commentsUrl.counterComments(data)})`;
          display.innerHTML = '';
          data.forEach((item) => {
            const commentList = document.createElement('li');
    
            commentList.textContent = `${item.creation_date} ${item.username} : ${item.comment}`;
            display.appendChild(commentList);
          });
        });
    };
}