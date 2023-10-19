import React from 'react';
import { Typography, AppBar, CssBaseline, Toolbar } from '@mui/material';
import Logo from '../../assets/images/addressbook.jpeg'

const Header = () => {
  return (
    <div>
    <CssBaseline />
    <AppBar position='relative' color=''>
        <Toolbar>
            <img src={Logo} alt="Logo" />
            <Typography variant='h6' sx={{fontWeight:'Bold', color:'#008CFF', fontFamily: '"Montserrat", sans-serif', lineHeight: '1' }} >
                ADDRESS <br />
                <span style={{color:'#42515F'}}>BOOK</span>
            </Typography>
        </Toolbar>
    </AppBar>
</div>
  )
}

export default Header