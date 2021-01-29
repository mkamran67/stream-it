import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from 'next/link';

const about = () => {
  return (
    <Container maxWidth='sm'>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Hello About!
        </Typography>
        <Link href='/'>
          <Button variant='contained' color='primary'>
            Home 🏠
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default about;
