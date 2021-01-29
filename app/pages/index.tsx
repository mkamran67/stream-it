import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from 'next/link';

const index = () => {
  return (
    <Container maxWidth='sm'>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Hello Next.js!
        </Typography>
        <Link href='/about'>
          <Button variant='contained' color='primary'>
            About
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default index;
