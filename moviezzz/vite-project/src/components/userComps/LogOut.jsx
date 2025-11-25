import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import { logOut } from '../../redux/slices/user';
import { showAlert } from '../../redux/slices/alert';

export default function LogOut() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(showAlert({type: "success", message: "Logged out successfully!"}));
  };

  return <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>;
}

