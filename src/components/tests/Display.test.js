import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Display from '../Display'
import userEvent from '@testing-library/user-event'

import mockFetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow')

const showData = {
   name: "Stranger Things",
   summary: "test summary",
   seasons: [
       {
           id:0,
           name: "Season 1", 
           episodes: []
       },
       {
           id:1,
           name: "Season 2", 
           episodes: []
       },
       {
           id:2,
           name: "Season 3", 
           episodes: []
       }
   ]
}

 test('Test that the Display component renders without any passed in props', () => {
     render(<Display />)
 })
 
 test('Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test', async () => {
    mockFetchShow.mockResolvedValueOnce(showData)
   
   render(<Display />)
  
   const button = screen.getByRole("button")
   userEvent.click(button)

      const renderedShow = await screen.findByTestId('show-container')
      expect(renderedShow).toBeInTheDocument()
 })
 
 test(' Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data', async () => {
    mockFetchShow.mockResolvedValueOnce(showData)
   
    render(<Display />)
   
    const button = screen.getByRole("button")
    userEvent.click(button)

    const seasonRendered = await screen.findAllByTestId('season-option')
   expect(seasonRendered).toHaveLength(3)
 })
 
 test('Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called', async () => {
   mockFetchShow.mockResolvedValueOnce(showData)
   const displayFunc = jest.fn()

   render(<Display displayFunc={displayFunc} />)
  
   const fetchButton = screen.getByRole("button")
   userEvent.click(fetchButton) 
   
   await waitFor(()=>{
      expect(displayFunc).toBeCalled()
   })
})


///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.