import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
	const [inputs,setInput]=useState({
		fullname:"",
		username:"",
		password:"",
		confirmpassword:"",
		gender:""

	});
	const {loading,signup}=useSignup()

	const handleCheckBoxChange=(gender:string)=>{
		setInput({...inputs,gender})
	}

	const handleSubmitForm=(e:React.FormEvent)=>{
		e.preventDefault();
		 signup(inputs);
	}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Full Name</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10'
						value={inputs.fullname}
						onChange={(e)=>setInput({...inputs,fullname:e.target.value})} />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Username</span>
						</label>
						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' 
						value={inputs.username}
						onChange={(e)=>setInput({...inputs,username:e.target.value})}/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
						onChange={(e)=>setInput({...inputs,password:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmpassword}
						onChange={(e)=>setInput({...inputs,confirmpassword:e.target.value})}
						/>
					</div>

					<GenderCheckbox  
					selectedGender ={inputs.gender}
					onCheckboxChange={handleCheckBoxChange}
					/>

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>
							{loading?"Loading..." : "Sign Up"}
							</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
