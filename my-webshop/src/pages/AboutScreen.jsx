import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import heartImg from '../assets/heartImg.jpg';
import StoreImg from '../assets/StoreImg.jpg';
import Store2Img from '../assets/Store2Img.jpg';
import Store3Img from '../assets/Store3Img.jpg';
import prodImg from '../assets/prodImg.jpg';
import whyUsImg from '../assets/whyUsImg.jpg';

const AboutScreen = () => {
  const itemData = [
    {
      img: heartImg,
      title: 'Heart',
    },
    {
      img: StoreImg,
      title: 'Store',
    },
    {
      img: prodImg,
      title: 'products',
    },
    {
      img: Store3Img,
      title: 'Store',
    },
    {
      img: whyUsImg,
      title: 'whyUs',
    },
    {
      img: Store2Img,
      title: 'Store',
    },
  ];

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Paper elevation={5} sx={{ mt: 4, p: 2, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Unde ne găsiți
        </Typography>
        <Typography variant="body1" align="center">
          <Typography variant="h5">
            Beiuș, Bihor <br />
          </Typography>
          📍Strada Pandurilor, Numărul 5 <br />
          📍Strada Horea, Numărul 1
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 2, width: '160%', maxWidth: '1000px', margin: '1 auto' }}>
        <Typography variant="h5" gutterBottom align="center">
          Aici este locul unde
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Îți vei găsi noul telefon smart mult visat, nou sau second-hand, la prețuri incomparabile!
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Îți vei putea vinde vechiul telefon
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Vei găși accesoriile perfecte pentru el: cu siguranță la noi vei găși și husele de protecție potrivite pentru gusturile tale, dar și foliile de protecție care să prevină evenimentele neplăcute după care vei avea nevoie să REDĂM PULSUL DISPOZITIVULUI TĂU.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Desigur tot la noi vei găși și toate accesoriile premium precum baterii externe pentru momentele când rămâi fără baterie la telefon, căști, suporți de mașină sau de birou pentru el, încărcătoare, dock-uri de încărcare și multe altele.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Și desigur ajutor, îndrumare și promtitudine din partea echipei noastre de oameni profesioniști și faini! 😊
        </Typography>
        <Typography variant="body1" gutterBottom>
          Și nu în ultimul rând, singurul service gsm existent pe piața națională de care telefonul tău are nevoie!
        </Typography>
        <Typography variant="body1">
          PULSIT – este un service gsm cu standarde înalte, cu tehnicieni profesioniști, calitate, promtitudine și multe pulsuri redate!
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 2, width: '100%' }}>
        <Box sx={{ width: '100%', height: 400 }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutScreen;
