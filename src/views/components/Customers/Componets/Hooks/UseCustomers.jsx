import { useState} from 'react';

export const useCustomers = () => {

    const [identification_type, setIdentificationType] = useState('');
    const [identification, setIdentification] = useState('');
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setDateBirth] = useState('');
    const [address, setDirection] = useState('');
    const [children_number, setSons] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [occupation, setOccupation] = useState('');
    const [register_type, setTypeRegister] = useState('');
    const [state, setState] = useState(false);
    const [has_habeas_data, setData] = useState(false);
    const [visible, setVisible] = useState(false);

    return {
			identification_type, setIdentificationType,
			identification, setIdentification,
			gender, setGender,
			name, setName,
			lastName, setLastName,
			birthday, setDateBirth,
			address, setDirection,
			children_number, setSons,
			email, setEmail,
			phone_number, setPhone,
			occupation, setOccupation,
			register_type, setTypeRegister,
			state, setState,
			has_habeas_data, setData,
			visible, setVisible
    };
}

