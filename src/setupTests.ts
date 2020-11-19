import Enzyme from 'enzyme'
// import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import UnofficialSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new UnofficialSeventeenAdapter() })
