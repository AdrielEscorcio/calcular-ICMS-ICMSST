import React, { useState } from 'react'
import styles from './calculo.module.css'

function Calculo() {

    const [vLiquido, setVLiquido] = useState(0);
    const [aliquotaOrigem, setAliquotaOrigem] = useState(0);
    const [aliquotaDestino, setAliquotaDestino] = useState(0);
    const [valorIVA, setValorIVA] = useState(0);
    const [valorICMS, setValorICMS] = useState(0);
    const [baseCalculoST, setBaseCalculoST] = useState(0);
    const [valorICMSST, setValorICMSST] = useState(0)


    function handleChangeVLiquido(e){
        setVLiquido(parseFloat(e.target.value) || 0);
    }
    function handleChangeAliquotaOrigem(e){
        setAliquotaOrigem(parseFloat(e.target.value) || 0);
    }

    function handleChangeAliquotaDestino(e){
        setAliquotaDestino(parseFloat(e.target.value) || 0);
    }
    
    function handleChangerValorIVA(e){
        setValorIVA(parseFloat(e.target.value) || 0)    
    }

    function calculoICMS(){
        const vicms = vLiquido * (aliquotaOrigem / 100);
        setValorICMS(vicms);
        return vicms;
    }

    function calculoICMSST(vicms){
        const baseDeCalculo = vLiquido * (1 + (valorIVA / 100));
        const valorST = baseDeCalculo * (aliquotaDestino / 100);
        const valorRecolher = valorST - vicms;
        setBaseCalculoST(baseDeCalculo);
        setValorICMSST(valorRecolher);
    }

    function calcularImpostos(){
        const icms = calculoICMS();
        calculoICMSST(icms);
    }

    function limpar(){
        setAliquotaDestino(0);
        setAliquotaOrigem(0);
        setBaseCalculoST(0);
        setVLiquido(0);
        setValorICMS(0);
        setValorICMSST(0);
        setValorIVA(0);
    }

  return (
    <div className={styles.principal}>
        <div>
            <label htmlFor="Valor Liquido">Valor Nota Fiscal</label>
            <input type="number" value={vLiquido} onChange={handleChangeVLiquido}/>
            <label htmlFor="Aliquota ICMS">Aliquota ICMS Origem</label>
            <input type="number" value={aliquotaOrigem} onChange={handleChangeAliquotaOrigem}/>
            <label htmlFor="Aliquota ICMS">Aliquota ICMS Destino</label>
            <input type="number" value={aliquotaDestino} onChange={handleChangeAliquotaDestino}/>
            <label htmlFor="Valor IVA">Valor IVA</label>
            <input type="number" value={valorIVA} onChange={handleChangerValorIVA}/>
            <button className={styles.buttonCalcular} onClick={calcularImpostos}>Calcular</button>
        </div>
        
        <div className={styles.resultados}> 
            {/* <p>Valor da Nota: {vLiquido}</p>
            <p>Aliquota de ICMS Origem: {aliquotaOrigem}%</p>
            <p>Aliquota de ICMS Destino: {aliquotaDestino}%</p>
            <p>Valor de IVA: {valorIVA}</p> */}

            <p>Base de Calculo ICMS: <strong>R$ {vLiquido}</strong></p>
            <p>Valor do ICMS: <strong>R$ {isNaN(valorICMS) ? "0.00" : valorICMS.toFixed(2)}</strong></p>
            <p>Base de Calculo ICMS ST: <strong>R$ {isNaN(baseCalculoST) ? "0.00" : baseCalculoST.toFixed(2)}</strong></p>
            <p>Valor do ICMS ST: <strong>R$ {isNaN(valorICMSST) ? "0.00" : valorICMSST.toFixed(2)}</strong></p>
            <button className={styles.buttonLimpar} onClick={limpar}>Limpar</button>
        </div>
        
    </div>
  )
}

export default Calculo;
