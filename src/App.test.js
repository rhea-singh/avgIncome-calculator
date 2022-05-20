import App from './App';
import PersonDetails from './components/personDetails';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('App Component', () => {
  const wrapper = shallow(<App />);

  it('should render title', () => {
    const element = wrapper.find('h1');
    expect(element.text()).toEqual('Employee Income Details');
  })

  it('renders personDetails component', () => {
    expect(wrapper.containsMatchingElement(<PersonDetails />)).toEqual(true);
  });
});