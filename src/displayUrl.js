import fetch from 'cross-fetch';

import fetchApi from './fetchApi.js';

export default class Movies {
  static url = 'https://api.tvmaze.com/search/shows?q=star';

  static clickLikes = () => {
    const likeIcon = document.querySelectorAll('.like-icon');
    likeIcon.forEach((element) => {
      element.addEventListener('click', () => {
        fetchApi.setLikes(parseInt(element.id, 10)).then(() => {
          this.newLikes();
        });
      });
    });
  };

  static newLikes = () => {
    fetchApi.getLikes().then((data) => {
      data.forEach((item) => {
        const boxicon = document.getElementById(`${item.item_id}`);
        if (boxicon) {
          boxicon.nextElementSibling.innerHTML = `${item.likes} likes`;
        }
      });
    });
  };

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
    this.clickLikes();
    this.newLikes();
  };
}
