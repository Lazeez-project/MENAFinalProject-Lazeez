import { Box } from '@mui/material';
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const ImageSlider = ({ images }) => {
    return (
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <SimpleImageSlider
                width={1150}
                height={504}
                images={images}/*require(`../../public/${images[0].url}`) */
                showBullets={true}
                showNavs={false}
                slideDuration={3}
                loop
                autoPlay
                style={{ margin: '0 auto', marginTop: '10px' }}
            />
        </Box>
    );
};

export default ImageSlider;
