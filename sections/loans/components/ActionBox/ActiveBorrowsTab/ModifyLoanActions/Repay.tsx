import { useState, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import { useRecoilValue } from 'recoil';

import { walletAddressState } from 'store/wallet';
import { Loan } from 'queries/loans/types';
import TransactionNotifier from 'containers/TransactionNotifier';
import { SYNTH_BY_CURRENCY_KEY } from 'sections/loans/constants';
import { tx } from 'utils/transactions';
import Wrapper from './Wrapper';

type RepayProps = {
	loanId: number;
	loanTypeIsETH: boolean;
	loan: Loan;
	loanContract: ethers.Contract;
};

const Repay: React.FC<RepayProps> = ({ loan, loanId, loanTypeIsETH, loanContract }) => {
	const address = useRecoilValue(walletAddressState);
	const { monitorTransaction } = TransactionNotifier.useContainer();

	const [isWorking, setIsWorking] = useState<string>('');
	const [repayAmountString, setRepayAmount] = useState<string>('0');
	const [error, setError] = useState<string | null>(null);
	const [txModalOpen, setTxModalOpen] = useState<boolean>(false);

	const debtAsset = SYNTH_BY_CURRENCY_KEY[loan.currency];
	const debtAssetDecimals = 18;

	const repayAmount = useMemo(() => ethers.utils.parseUnits(repayAmountString, debtAssetDecimals), [
		repayAmountString,
	]);
	const remainingAmount = useMemo(() => loan.amount.sub(repayAmount), [loan.amount, repayAmount]);
	const remainingAmountString = useMemo(
		() => ethers.utils.formatUnits(remainingAmount, debtAssetDecimals),
		[remainingAmount]
	);
	const isRepayingFully = useMemo(() => remainingAmount.isZero(), [remainingAmount]);

	const onSetLeftColAmount = (amount: string) =>
		!amount
			? setRepayAmount('0')
			: ethers.utils.parseUnits(amount, debtAssetDecimals).gt(loan.amount)
			? onSetLeftColMaxAmount()
			: setRepayAmount(amount);
	const onSetLeftColMaxAmount = () => setRepayAmount(ethers.utils.formatUnits(loan.amount));

	const getTxData = useCallback(
		(gas: Record<string, number>) => {
			if (!(loanContract && !repayAmount.isZero())) return null;
			return [loanContract, 'repay', [address, loanId, repayAmount, gas]];
		},
		[loanContract, address, loanId, repayAmount]
	);

	const repay = async (gas: Record<string, number>) => {
		try {
			setIsWorking('repaying');
			setTxModalOpen(true);
			await tx(() => getTxData(gas), {
				showErrorNotification: (e: string) => setError(e),
				showProgressNotification: (hash: string) =>
					monitorTransaction({
						txHash: hash,
						onTxConfirmed: () => {},
					}),
			});
		} catch {
		} finally {
			setIsWorking('');
			setTxModalOpen(false);
		}
	};

	return (
		<Wrapper
			{...{
				getTxData,

				loan,
				loanTypeIsETH,
				showCRatio: true,

				leftColLabel: 'loans.modify-loan.repay.left-col-label',
				leftColAssetName: debtAsset,
				leftColAmount: repayAmountString,
				onSetLeftColAmount,
				onSetLeftColMaxAmount,

				rightColLabel: 'loans.modify-loan.repay.right-col-label',
				rightColAssetName: debtAsset,
				rightColAmount: remainingAmountString,

				buttonLabel: `loans.modify-loan.repay.button-labels.${
					isWorking ? isWorking : isRepayingFully ? 'repaying-fully-error' : 'default'
				}`,
				buttonIsDisabled: !!isWorking || isRepayingFully,
				onButtonClick: repay,

				error,
				setError,

				txModalOpen,
				setTxModalOpen,
			}}
		/>
	);
};

export default Repay;
