import React from 'react';

type Provider = {
  name: string;
  specialty: string;
  address: string;
  phone: string;
};

type ResultPresentationProps = {
  providers: Provider[];
  medicalInfo: string;
};

const ResultPresentation: React.FC<ResultPresentationProps> = ({ providers, medicalInfo }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Výsledky</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Doporučení poskytovatelé zdravotních služeb:</h3>
        <ul className="list-disc pl-5">
          {providers.map((provider, index) => (
            <li key={index} className="mb-2">
              <p className="font-medium">{provider.name}</p>
              <p>Specializace: {provider.specialty}</p>
              <p>Adresa: {provider.address}</p>
              <p>Telefon: {provider.phone}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Relevantní zdravotní informace:</h3>
        <p>{medicalInfo}</p>
      </div>
    </div>
  );
};

export default ResultPresentation;