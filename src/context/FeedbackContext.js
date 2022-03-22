import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: 'This is feedback item 1',
			rating: 10
		},
		{
			id: 2,
			text: 'This is feedback item 2',
			rating: 9
		},
		{
			id: 3,
			text: 'This is feedback item 3',
			rating: 8
		},
	]);
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false
	})

	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		console.log(newFeedback);
		setFeedback([newFeedback, ...feedback])
	}

	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')){
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}
	// Set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true
		})
	}
	// Update feedback item
	const updateFeedback = (id, updItem) => {
		setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
	}

	return <FeedbackContext.Provider 
		value={{
			feedback,
			feedbackEdit,
			deleteFeedback,
			addFeedback,
			editFeedback,
			updateFeedback,
		}}
	>
		{children}
	</FeedbackContext.Provider>
}

export default FeedbackContext