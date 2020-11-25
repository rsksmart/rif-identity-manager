import Enzyme from 'enzyme'
import UnofficialSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import LocalStorageMock from './tests/LocalStorageMock'

Enzyme.configure({ adapter: new UnofficialSeventeenAdapter() })

Object.defineProperty(window, 'localStorage', { value: LocalStorageMock })
