import { Container, Typography, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import News1 from '../../assets/News1.jpeg';
import News2 from '../../assets/News2.jpg';
import News3 from '../../assets/News3.jpeg';
import Service1 from '../../assets/Service1.jpg';
import Service2 from '../../assets/Service2.webp';
import Service3 from '../../assets/Service3.jpeg';

const AboutPage = () => {
  const newsHeadlines = [
    {
      title: "Stock Market Hits Record High",
      description: "The stock market reached an all-time high today, driven by strong corporate earnings and economic growth.",
      date: "August 6, 2024",
      image: News1
    },
    {
      title: "Federal Reserve Announces Interest Rate Cut",
      description: "The Federal Reserve has announced a reduction in interest rates to stimulate economic activity amidst global uncertainties.",
      date: "August 5, 2024",
      image: News2
    },
    {
      title: "Top Investment Strategies for 2024",
      description: "Experts share their insights on the most effective investment strategies for the upcoming year, focusing on diversification and risk management.",
      date: "August 4, 2024",
      image: News3
    },
  ];

  return (
    <Container>
      {/* Paragraph */}
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography paragraph>
        We are committed to delivering high-quality portfolio management services and exceptional customer support. Our team is dedicated to helping clients achieve their financial goals through strategic investment planning and expert advice.
      </Typography>

      {/* About Cards */}
      <Box mt={4}>
        <Grid container spacing={3}>
          {/* Card 1 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={Service1}
                alt="Service 1"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Asset Allocation
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Comprehensive asset allocation strategies to optimize your investment portfolio and manage risk effectively.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={Service2}
                alt="Service 2"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Risk Management
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Advanced risk management techniques to safeguard your investments against market volatility and unforeseen events.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={Service3}
                alt="Service 3"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Retirement Planning
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tailored retirement planning solutions to ensure a secure and comfortable financial future.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* News Headlines Section */}
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Latest Financial News
        </Typography>
        <Grid container spacing={3}>
          {newsHeadlines.map((news, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={news.image}
                  alt={news.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {news.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                    {news.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
