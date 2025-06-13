import Clean from './clean';
import Classic from './classic';
import Creative from './creative';
import Functional from './functional';
import Modern from './modern';

const templates = {
  clean: {
    name: 'Clean',
    component: Clean,
  },
  classic: {
    name: 'Classic',
    component: Classic,
  },
  creative: {
    name: 'Creative',
    component: Creative,
  },
  functional: {
    name: 'Functional',
    component: Functional,
  },
  modern: {
    name: 'Modern',
    component: Modern,
  },
};

export default templates;
