// import { render, screen } from '@testing-library/react';
// import App from './App';

import {shallow,configure,render} from 'enzyme'
import React from 'react'
import App from './App'
import Adapter from 'enzyme-adapter-react-16';
import {useParams,useHistory} from 'react-router-dom';
configure({ adapter: new Adapter() });
describe('Loginpages',()=>{
    
    it("Loginpage",()=>{
        var exported=shallow(<App/>)
        var text="This is app.js"
        var t=exported.find('p')
        expect(t.contains(text)).toEqual(true)
    });

})