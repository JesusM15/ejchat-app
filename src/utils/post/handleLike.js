import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
const fullUrl = url + '/api/post/'

export const handleLike = async ({ post, hasLiked }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      if (hasLiked) {
        await axios.post(`${fullUrl}${post.id}/unlike/`, {}, config);
      } else {
        await axios.post(`${fullUrl}${post.id}/like/`, {}, config);
      }
    } catch(e){
      console.error(e);
    }
};