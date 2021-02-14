// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;

    button: {
      backgroundColor: string;
      hoverColor: string;
    };

    contentHover: {
      color: string;
      backgroundColor: string;
    };
  }
}
