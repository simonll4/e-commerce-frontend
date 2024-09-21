import 'vuetify/styles';
import 'vuetify/styles/main.sass';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { fa } from 'vuetify/iconsets/fa';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure your project is capable of handling css files

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
        },
      },
    },
  },
});
