import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const followUrl = `${url}/api/profiles/follow/`;

export const handleFollowUser = async (user, isFollowing) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        };
        if (isFollowing) {
            // Dejar de seguir
            await axios.delete(`${followUrl}${user.id}/`, config);
        } else {
            // Seguir
            await axios.post(followUrl, {
              followed: user.id
            }, config);
        }
    } catch (e) {
        console.error(e);
    }
};
