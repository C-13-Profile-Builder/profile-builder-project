import {shallow,configure,render} from 'enzyme'
import React from 'react'
import Loginpage from '../components/Loginpage'
import Adapter from 'enzyme-adapter-react-16';
import {useParams,useHistory} from 'react-router-dom';
configure({ adapter: new Adapter() });
describe('Loginpages',()=>{
    it("renders correctly", () => {
        const wrapper = shallow(
          <Loginpage />
        );
        expect(wrapper).toMatchSnapshot();
      });
    it("Loginpage",()=>{
        var exported=shallow(<Loginpage/>)
        var text=" EmailId Doesnt exist"
        var t=exported.find('h6')
        expect(t.contains(text)).toEqual(true)
    });
    
    it("Loginpage",()=>{
        var exported=shallow(<Loginpage/>)
        var t=exported.find('#ForTestingPurpose')
        t.simulate('click')
        var t1=exported.find('#paraForTesting').text()
        expect(t1).toEqual("hellomailsent")
    });
})