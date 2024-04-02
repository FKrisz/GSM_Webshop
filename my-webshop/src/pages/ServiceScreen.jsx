import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceScreen = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Repară produsul tău preferat în <br /> PulsiT Webshop & Service
      </Typography>

      <Paper elevation={3} sx={{ mt: 4, p: 2, width: '100%' }}>
        <Typography variant="body1" gutterBottom textAlign={'justify'}>
          Trimiți produsul defect iar noi îl reparăm. Profiți de servicii fără contact fizic pentru toate produsele, 
          indiferent de locul de unde le-ai achiziționat. Ai doar câțiva pași de urmat:
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={'justify'}>
          Împachetează produsul corespunzător. Recomandăm utilizarea ambalajului original, pentru o protecție mai bună a produsului. <br />
          În cazul în care acesta nu este disponibil, atunci poți să improvizezi ceva rezistent: îl învelești în folie cu bule, pungi 
          de plastic, hârtie de ziar, carton ondulat sau tocat și apoi îl pui într-o cutie.
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={'justify'}>
          Contactează Fan Courier (online sau telefonic la 021 9336) și plasează comandă pentru un curier, cu plata transportului efectuată 
          de tine la trimitere și îl înapoiem gratuit.
        </Typography>
      </Paper>
      
      <p />
        <Typography variant="h5">Proces de livrare și returnare</Typography>
      
    <div>
       <Accordion sx={{ mt: 4, width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Adresa la care se trimite coletul</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            📍 Strada Pandurilor, Numărul 5, Beiuș, Bihor, România <br />
            📲 0752 687 815
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
         <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Typography variant="h6">Ce documente trebuie să conțină coletul</Typography>
        </AccordionSummary> 
        <AccordionDetails>
          <Typography>
          - nume <br />
          - adresă de email <br />
          - număr de telefon <br />
          - problemă <br />
          - adresa de livrare <br />
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
         <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Typography variant="h6">Alte detalii</Typography>
        </AccordionSummary> 
        <AccordionDetails>
          <Typography>
          - Te rugăm să fii la locul menționat de tine pentru a putea prelua produsul. <br />
          - Returul este gratuit: După repararea acestuia, îți trimitem dispozitivul înapoi la adresa indicată. <br />
            Timpul de livrare depinde de serviciul de curierat. <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

      <p />
    </Box>
  );
};

export default ServiceScreen;