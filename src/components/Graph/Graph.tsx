import Chart from 'react-google-charts';
import { Container, GraphWrapper } from './Graph.style';

const Graph = ({
  title,
  errors,
  data,
  formatedData,
}: {
  title: string;
  errors: any;
  data: any;
  formatedData: any[];
  date?: boolean;
}) => {
  return (
    <Container>
      <GraphWrapper>
        {errors ? (
          <div>
            Erreur lors du chargement des données statistique, veuillez nous
            excuser et re-essayer plus tard.
          </div>
        ) : !data ? (
          'Chargement des données...'
        ) : (
          <Chart
            height={'400px'}
            chartType="LineChart"
            chartLanguage="FR-fr"
            loader={<div>Chargement du graph...</div>}
            data={formatedData}
            options={{
              title,
              colors: ['#0078f3', '#f60700', '#1f8d49', '#009099'],
              hAxis: {
                slantedText: true,
                slantedTextAngle: 30,
              },
            }}
          />
        )}
      </GraphWrapper>
    </Container>
  );
};

export default Graph;
