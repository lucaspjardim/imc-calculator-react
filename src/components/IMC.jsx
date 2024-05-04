import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function IMC() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [rank, setRank] = useState('');
    const [error, setError] = useState('');
    const [imc, setImc] = useState(null);

    const calcIMC = () => {
        const heightNum = parseFloat(height.replace(',', '.'));
        const weightNum = parseFloat(weight.replace(',', '.'));

        if (isNaN(weightNum) || isNaN(heightNum) || heightNum <= 0 || weightNum <= 0) {
            setError('Por favor, insira valores válidos para altura e peso.');
            return;
        }

        const heightInMeters = heightNum <= 3 ? heightNum : heightNum / 100;
        const imcVal = weightNum / (heightInMeters * heightInMeters);
    
        setImc(imcVal.toFixed(2));
        setRank(getRank(imcVal));
        setError('');
    };

    const getRank = (imc) => {
        if (imc < 18.5) {
            return { classification: 'Abaixo do peso'};
        } else if (imc < 25) {
            return { classification: 'Peso normal'};
        } else if (imc < 30) {
            return { classification: 'Acima do peso'};
        } else if (imc < 35) {
            return { classification: 'Obesidade classe I'};
        } else if (imc < 40) {
            return { classification: 'Obesidade classe 2'};
        }
        return { classification: 'Obesidade classe 3'};
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <h5 className="card-header bg-primary text-white">Tabela de Classificação de IMC</h5>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>IMC</th>
                                        <th>Classificação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={imc !== null && imc < 18.5 ? 'table-warning' : ''}>
                                        <td>&lt; 18.5</td>
                                        <td>Abaixo do peso</td>
                                    </tr>
                                    <tr className={imc !== null && imc >= 18.5 && imc < 25 ? 'table-success' : ''}>
                                        <td>18.5 - 24.9</td>
                                        <td>Peso normal</td>
                                    </tr>
                                    <tr className={imc !== null && imc >= 25 && imc < 30 ? 'table-warning' : ''}>
                                        <td>25.0 - 29.9</td>
                                        <td>Acima do peso</td>
                                    </tr>
                                    <tr className={imc !== null && imc >= 30 && imc < 35 ? 'table-warning' : ''}>
                                        <td>30.0 - 34.9</td>
                                        <td>Obesidade classe I</td>
                                    </tr>
                                    <tr className={imc !== null && imc >= 35 && imc < 40 ? 'table-danger' : ''}>
                                        <td>35.0 - 39.9</td>
                                        <td>Obesidade classe II</td>
                                    </tr>
                                    <tr className={imc !== null && imc >= 40 ? 'table-danger' : ''}>
                                        <td>&#8805; 40.0</td>
                                        <td>Obesidade classe III</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <h5 className="card-header bg-primary text-white">Calculadora de IMC</h5>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label htmlFor="altura" className="form-label">Altura (metros)</label>
                                <InputMask
                                    mask="9.99"
                                    value={height}
                                    placeholder="1.70"
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="peso" className="form-label">Peso (kg)</label>
                                <input
                                    value={weight}
                                    placeholder="70.0"
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <button className="btn btn-primary" onClick={calcIMC}>Calcular</button>
                            {imc !== null && (
                                <div className="mt-3">
                                    <h4>Seu IMC é: {imc}</h4>
                                    <h5 className="text-muted">Classificação: {rank.classification}</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IMC;
