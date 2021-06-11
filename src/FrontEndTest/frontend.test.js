import {shallow,configure,render} from 'enzyme'
import React from 'react'
import Homepage from '../components/Homepage'
import Adapter from 'enzyme-adapter-react-16';
import {useParams,useHistory} from 'react-router-dom';
configure({ adapter: new Adapter() });
describe('Homepages',()=>{
    it("renders correctly", () => {
        const wrapper = shallow(<Homepage />
        );
        expect(wrapper).toMatchSnapshot();
      });
    it("Homepage",()=>{
        var exported=shallow(<Homepage/>)
        var text="Google Scholar ID"
        var t=exported.find('#GoogleSDetails')
        expect(t.contains(text)).toEqual(true)
    });
    it("Homepage",()=>{
        var exported=shallow(<Homepage/>)
        var text="Consultation"
        var t=exported.find('h5')
        expect(t.contains(text)).toEqual(true)
    });
    it("Homepage",()=>{
        var exported=shallow(<Homepage><div id="ShowNetwork">

        </div></Homepage>
            
            )
        var text="CONNECTED TO"
        var t=exported.find('h2')
        expect(t.contains(text)).toEqual(true)
    });
    it("Homepage",()=>{
        var exported=shallow(<Homepage/>)
        var text="Sign Out"
        var t=exported.find('NavDropdown.Item')
        expect(t.contains(text)).toEqual(false)
    });
})