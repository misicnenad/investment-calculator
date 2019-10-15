import React, { Component } from 'react';
import './App.css';
import Row from './Row/Row';
import AccumulatedAmountsRow from './Row/AccumulatedAmountsRow';

class App extends Component {
	state = {
		startingAmount: 0.0,
		nonInflatedDefaultAccumulatedAmount: 0.0,
		defaultAccumulatedAmount: 0.0,
		untaxedAccumulatedAmount: 0.0,
		taxedAccumulatedAmount: 0.0,
		amountToAddPerMonth: 400.0,
		numberOfYears: 30,
		upperValueIncreasePercentage: 14,
		lowerValueIncreasePercentage: 2,
		upperInflationPercentage: -4.5,
		lowerInflationRangePercentage: -1.5,
		inputTaxPercentage: -2.7,
		yearlyTaxPercentage: -1.25,
	};

	createSimpleValueRows() {
		return this.createRows(this.createSimpleCalculationRow);
	}

	createComplexValueRows = () => {
		return this.createRows(this.createComplexCalculationRow);
	};

	createRows = getCalculatedAmounts => {
		let rows = [];

		let defaultAccumulatedAmount = this.state.startingAmount,
			nonInflatedDefaultAccumulatedAmount = this.state.startingAmount,
			untaxedAccumulatedAmount = this.state.startingAmount,
			nonInflatedUntaxedAccumulatedAmount = this.state.startingAmount,
			taxedAccumulatedAmount = this.state.startingAmount,
			nonInflatedTaxedAccumulatedAmount = this.state.startingAmount;

		for (let year = 0; year < this.state.numberOfYears; year++) {
			let {
				newDefAmount,
				newNonInflDefAmount,
				newUntaxedAmount,
				newNonInflUntaxedAmount,
				newTaxedAmount,
				newNonInflTaxedAmount,
			} = getCalculatedAmounts(
				defaultAccumulatedAmount,
				nonInflatedDefaultAccumulatedAmount,
				untaxedAccumulatedAmount,
				nonInflatedUntaxedAccumulatedAmount,
				taxedAccumulatedAmount,
				nonInflatedTaxedAccumulatedAmount
			);

			defaultAccumulatedAmount = newDefAmount;
			nonInflatedDefaultAccumulatedAmount = newNonInflDefAmount;
			untaxedAccumulatedAmount = newUntaxedAmount;
			nonInflatedUntaxedAccumulatedAmount = newNonInflUntaxedAmount;
			taxedAccumulatedAmount = newTaxedAmount;
			nonInflatedTaxedAccumulatedAmount = newNonInflTaxedAmount;

			rows.push(
				<AccumulatedAmountsRow
					yearNumber={year + 1}
					defaultAccumulatedAmount={defaultAccumulatedAmount}
					nonInflatedDefaultAccumulatedAmount={
						nonInflatedDefaultAccumulatedAmount
					}
					untaxedAccumulatedAmount={untaxedAccumulatedAmount}
					nonInflatedUntaxedAccumulatedAmount={
						nonInflatedUntaxedAccumulatedAmount
					}
					taxedAccumulatedAmount={taxedAccumulatedAmount}
					nonInflatedTaxedAccumulatedAmount={nonInflatedTaxedAccumulatedAmount}
					key={year}
				/>
			);
		}

		return rows;
	};

	createSimpleCalculationRow = (
		defaultAccumulatedAmount,
		nonInflatedDefaultAccumulatedAmount,
		untaxedAccumulatedAmount,
		nonInflatedUntaxedAccumulatedAmount,
		taxedAccumulatedAmount,
		nonInflatedTaxedAccumulatedAmount
	) => {
		let numberOfMonths = 12;

		for (let month = 0; month < numberOfMonths; month++) {
			defaultAccumulatedAmount += this.state.amountToAddPerMonth;

			nonInflatedDefaultAccumulatedAmount += this.state.amountToAddPerMonth;

			untaxedAccumulatedAmount += this.state.amountToAddPerMonth;

			nonInflatedUntaxedAccumulatedAmount += this.state.amountToAddPerMonth;

			taxedAccumulatedAmount +=
				this.state.amountToAddPerMonth *
				(1 + this.state.inputTaxPercentage / 100.0);

			nonInflatedTaxedAccumulatedAmount +=
				this.state.amountToAddPerMonth *
				(1 + this.state.inputTaxPercentage / 100.0);
		}

		defaultAccumulatedAmount = Math.floor(
			defaultAccumulatedAmount * (1 + this.getMeanInflationRate() / 100.0)
		);

		nonInflatedDefaultAccumulatedAmount = Math.floor(
			nonInflatedDefaultAccumulatedAmount
		);

		untaxedAccumulatedAmount = Math.floor(
			untaxedAccumulatedAmount *
				(1 +
					(this.getMeanValueIncreasePercentage() +
						this.getMeanInflationRate()) /
						100)
		);

		nonInflatedUntaxedAccumulatedAmount = Math.floor(
			nonInflatedUntaxedAccumulatedAmount *
				(1 + this.getMeanValueIncreasePercentage() / 100)
		);

		taxedAccumulatedAmount = Math.floor(
			taxedAccumulatedAmount *
				(1 +
					(this.getMeanValueIncreasePercentage() +
						this.getMeanInflationRate() +
						this.state.yearlyTaxPercentage) /
						100)
		);

		nonInflatedTaxedAccumulatedAmount = Math.floor(
			nonInflatedTaxedAccumulatedAmount *
				(1 +
					(this.getMeanValueIncreasePercentage() +
						this.state.yearlyTaxPercentage) /
						100)
		);

		return {
			newDefAmount: defaultAccumulatedAmount,
			newNonInflDefAmount: nonInflatedDefaultAccumulatedAmount,
			newUntaxedAmount: untaxedAccumulatedAmount,
			newNonInflUntaxedAmount: nonInflatedUntaxedAccumulatedAmount,
			newTaxedAmount: taxedAccumulatedAmount,
			newNonInflTaxedAmount: nonInflatedTaxedAccumulatedAmount,
		};
	};

	getMeanInflationRate = () => {
		return (
			(this.state.upperInflationPercentage +
				this.state.lowerInflationRangePercentage) /
			2
		);
	};

	createComplexCalculationRow = (
		nonInflatedDefaultAccumulatedAmount,
		defaultAccumulatedAmount,
		untaxedAccumulatedAmount,
		taxedAccumulatedAmount
	) => {};

	calculateMonthlyAmountToAdd = () => {
		return (
			this.state.amountToAddPerMonth *
			(1 +
				(this.getValueIncreasePercentage() - this.state.inputTaxPercentage) /
					100.0)
		);
	};

	getValueIncreasePercentage = () => {
		return (
			Math.random() *
				(this.state.upperValueIncreasePercentage -
					this.state.lowerValueIncreasePercentage) +
			this.state.lowerValueIncreasePercentage
		);
	};

	getYearlyInflation = () => {
		return (
			Math.random() *
				(this.state.upperInflationPercentage -
					this.state.lowerInflationRangePercentage) +
			this.state.lowerInflationRangePercentage
		);
	};

	getMeanValueIncreasePercentage() {
		return (
			(this.state.upperValueIncreasePercentage +
				this.state.lowerValueIncreasePercentage) /
			2
		);
	}

	render() {
		return (
			<div className='App container mt-4'>
				<div className='row'>
					<p className='col'>
						Mean value increase {this.getMeanValueIncreasePercentage()}
					</p>
					<p className='col'>Mean inflation {this.getMeanInflationRate()}</p>
				</div>
				<Row
					firstColumnMainValue='Number of years'
					secondColumnMainValue='Default amount accumulated'
					secondColumnSecondaryValue='(without inflation)'
					thirdColumnMainValue='Untaxed amount accumulated'
					thirdColumnSecondaryValue='(without inflation)'
					forthColumnMainValue='Reduced amount accumulated'
					forthColumnSecondaryValue='(without inflation)'
					isPrimary={true}
				/>
				{this.createSimpleValueRows()}
			</div>
		);
	}
}

export default App;
