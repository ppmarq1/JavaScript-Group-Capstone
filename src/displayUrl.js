export default class Movies {
  static url = 'https://api.tvmaze.com/search/shows?q=star';

  static displayMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    const movieContainer = document.querySelector('.movie-container');

    data.forEach((item) => {
      if (item.show.image !== null) {
        const div = document.createElement('div');
        div.classList.add('each-movie');
        div.innerHTML = `<img src="${item.show.image.medium}" alt="movie-image">
      <div class="each">
        <li>${item.show.name}</li>
        <div class="likes">
          <box-icon color="orange" animation="burst-hover" id=${item.show.id} type="solid" class="like-icon" name='like'></box-icon>
          <p>0 Likes</p>
        </div>
      </div>      
      <button id="${item.show.id}" class="button">Comments</button>`;
        movieContainer.appendChild(div);
      }
    });
  };

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
