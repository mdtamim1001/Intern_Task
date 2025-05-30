'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  ComputerDesktopIcon,
  GlobeAltIcon,
  MapPinIcon,
  TagIcon,
  CurrencyDollarIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';




export default function CreateStorePage() {
  const router = useRouter();

  const [storeName, setStoreName] = useState('');
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('Bangladesh');
  const [category, setCategory] = useState('Fashion');
  const [currency, setCurrency] = useState('BDT');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    storeName: '',
    domain: '',
    email: ''
  });

  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);

useEffect(() => {
    const checkDomain = async () => {
      if (domain) {
        try {
          const res = await axios.get<{
            status: number;
            succcess: boolean;
            message: string;
            data: {
              message: string;
              taken: boolean;
            };
          }>(
            `https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`
          );

          setDomainAvailable(!res.data.data.taken);
          setErrors(prev => ({
            ...prev,
            domain: res.data.data.taken ? 'Not Available Domain, Re-enter!' : ''
          }));
        } catch (err) {
          setErrors(prev => ({ ...prev, domain: 'Domain check failed' }));
        }
      }
    };

    const debounce = setTimeout(checkDomain, 500);
    return () => clearTimeout(debounce);
  }, [domain]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleStoreNameKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setStoreName(value);
    setErrors(prev => ({
      ...prev,
      storeName: value.length < 3 ? 'Store name must be at least 3 characters long' : ''
    }));
  };

  const handleDomainKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setDomain((e.target as HTMLInputElement).value);
  };

  const handleEmailKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail(value);
    setErrors(prev => ({
      ...prev,
      email: validateEmail(value) ? '' : 'Invalid email format!'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      storeName: storeName.length < 3 ? 'Store name must be at least 3 characters long' : '',
      domain: domainAvailable === false ? 'Not Available Domain, Re-enter!' : '',
      email: validateEmail(email) ? '' : 'Invalid email format!'
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(err => err);
    if (hasErrors) return;

    const data={name: storeName,
        currency,
        country: location,
        domain,
        category,
        email}

    try {
      await axios.post('https://interview-task-green.vercel.app/task/stores/create',data);
      alert('Store created successfully!');
      router.push('/products');
    } 
    catch (error: any) {
    if (error && typeof error === 'object' && 'response' in error) {
  const response = (error as any).response;
  const message =
    response?.data?.errro?.[0]?.message || response?.data?.message || 'Unknown error';
   alert(`Failed to create store: ${message}`);
} else {
  alert('Failed to create store.');
}
    }
  };



return (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Create a store</h2>
    <form onSubmit={handleSubmit}>
      <table className="w-full table-fixed">
        <tbody className="space-y-6">

          <tr className="align-top">
            <td className="w-12 pr-2 py-4 align-top">
              <div className="flex justify-center pt-1">
                <ComputerDesktopIcon className="h-5 w-5 text-blue-500" />
              </div>
            </td>
            <td className="w-1/2 pr-6 py-4">
              <div>
                <h3 className="font-semibold">Give your online store a name</h3>
                <p className="text-sm text-gray-600">A great store name is a big part of your success. Make sure it aligns with your brand and products.</p>
              </div>
            </td>
            <td className="w-1/2 py-4">
              <input
                type="text"
                placeholder="How'd you like to call your store?"
                defaultValue={storeName}
                onKeyUp={handleStoreNameKeyUp}
                className={`input input-bordered w-full ${errors.storeName && 'border-red-500'}`}
              />
              {errors.storeName && <div className="text-red-500 text-sm mt-1">{errors.storeName}</div>}
            </td>
          </tr>

          <tr className="align-top">
            <td className="w-12 pr-2 py-4 align-top">
              <div className="flex justify-center pt-1">
                <GlobeAltIcon className="h-5 w-5 text-blue-500" />
              </div>
            </td>
            <td className="pr-6 py-4">
              <div>
                <h3 className="font-semibold">Your online store subdomain</h3>
                <p className="text-sm text-gray-600">A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products.</p>
              </div>
            </td>
            <td className="py-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="enter your domain name"
                  defaultValue={domain}
                  onKeyUp={handleDomainKeyUp}
                  className={`input input-bordered w-full ${errors.domain && 'border-red-500'}`}
                />
                <span className="text-gray-600">.expressitbd.com</span>
              </div>
              {errors.domain && <div className="text-red-500 text-sm mt-1">{errors.domain}</div>}
            </td>
          </tr>

          <tr className="align-top">
            <td className="w-12 pr-2 py-4 align-top">
              <div className="flex justify-center pt-1">
                <MapPinIcon className="h-5 w-5 text-blue-500" />
              </div>
            </td>
            <td className="pr-6 py-4">
              <div>
                <h3 className="font-semibold">Where's your store located?</h3>
                <p className="text-sm text-gray-600">Set your store's default location so we can optimize store access and speed for your customers.</p>
              </div>
            </td>
            <td className="py-4">
              <select className="select select-bordered w-full" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option>Bangladesh</option>
                <option>India</option>
                <option>USA</option>
              </select>
            </td>
          </tr>

          <tr className="align-top">
            <td className="w-12 pr-2 py-4 align-top">
              <div className="flex justify-center pt-1">
                <TagIcon className="h-5 w-5 text-blue-500" />
              </div>
            </td>
            <td className="pr-6 py-4">
              <div>
                <h3 className="font-semibold">What's your Category?</h3>
                <p className="text-sm text-gray-600">Set your store's default category so that we can optimize store access and speed for your customers.</p>
              </div>
            </td>
            <td className="py-4">
              <select className="select select-bordered w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Fashion</option>
                <option>Electronics</option>
                <option>Grocery</option>
              </select>
            </td>
          </tr>

          <tr className="align-top">
            <td className="w-12 pr-2 py-4 align-top">
              <div className="flex justify-center pt-1">
                <CurrencyDollarIcon className="h-5 w-5 text-blue-500" />
              </div>
            </td>
            <td className="pr-6 py-4">
              <div>
                <h3 className="font-semibold">Choose store currency</h3>
                <p className="text-sm text-gray-600">This is the main currency you wish to sell in.</p>
              </div>
            </td>
            <td className="py-4">
              <select className="select select-bordered w-full" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="BDT">BDT (Taka)</option>
                <option value="INR">INR (Rupee)</option>
                <option value="USD">USD (Dollar)</option>
              </select>
            </td>
          </tr>

          <tr className="align-top">
            <td className="w-12 pr-2 py-4 align-top">
              <div className="flex justify-center pt-1">
                <EnvelopeIcon className="h-5 w-5 text-blue-500" />
              </div>
            </td>
            <td className="pr-6 py-4">
              <div>
                <h3 className="font-semibold">Store contact email</h3>
                <p className="text-sm text-gray-600">This is the email you'll use to send notifications to and receive orders from customers.</p>
              </div>
            </td>
            <td className="py-4">
              <input
                type="email"
                placeholder="you@example.com"
                defaultValue={email}
                onKeyUp={handleEmailKeyUp}
                className={`input input-bordered w-full ${errors.email && 'border-red-500'}`}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </td>
          </tr>

          <tr>
            <td colSpan={2} className="pt-6"></td>
            <td className="pt-6">
              <div className="flex justify-end items-center w-full">
                <button
                  type="submit"
                  className="btn btn-primary w-fit"
                  disabled={Object.values(errors).some(Boolean)}
                >
                  Create store
                </button>
              </div>
            </td>
          </tr>




        </tbody>
      </table>
    </form>
  </div>
);

}