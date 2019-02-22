import React, { Component } from "react";
import { Line, Content, FlexItem, FlexContainer } from "./components/Styled";

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <h1>FILEX Newsletter #1: Japanese Kabuki Theater</h1>
        <Line />
        <Content>
          <p>Do you like japanese culture?</p>
          <p>
            Would you like to learn about a unique type of theater in Japan?
          </p>
          <p>
            Click <a href="http://example.com">here</a> to go to our blog and
            learn something new!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
            nisi vitae est blandit dignissim eu non massa. Sed nec tristique
            turpis, at congue arcu. Nulla metus ligula, semper et orci id,
            ultrices viverra magna. Sed eu tristique dui, quis facilisis tortor.
            Donec non ex a lectus lacinia tincidunt in ac magna. Donec commodo
            orci lacinia ligula tincidunt convallis. Nulla faucibus semper
            congue. Aliquam ac ultricies odio. In sit amet elementum ex.
          </p>
          <p>
            Phasellus ut est diam. Donec dui elit, fringilla nec molestie id,
            ornare et ipsum. In sed vehicula justo, pretium volutpat metus. Sed
            sed finibus quam. Morbi velit nulla, efficitur eget tortor ac,
            volutpat tempor nulla. Suspendisse potenti. Cras pellentesque vel
            tortor convallis aliquam. Nam interdum venenatis finibus.
          </p>
          <Line />
          <h2>Talleres CAG:</h2>
          <p>
            Recuerda que tenemos algunos talleres para ti en el Centro de
            Aprendizaje Global
          </p>
          <FlexContainer>
            <FlexItem>
              <h3>Club de Conversación</h3>
              <p>Lunes 13:00 - 14:00</p>
              <p>Martes 15:00 - 16:00</p>
            </FlexItem>
            <FlexItem>
              <h3>Español para extranjeros</h3>
              <p>Lunes 13:00 - 14:00</p>
              <p>Martes 15:00 - 16:00</p>
            </FlexItem>
          </FlexContainer>
          <footer>
            <Line />
            <p>
              Este e-mail fue enviado por el staff de FILEX. Para desuscribirte
              solo debes responder a este email.
            </p>
          </footer>
        </Content>
      </div>
    );
  }
}

export default App;
