import { useQuery, QueryConfig } from 'react-query';
import { useRecoilValue } from 'recoil';

import QUERY_KEYS from 'constants/queryKeys';

import { isWalletConnectedState, networkState, walletAddressState } from 'store/wallet';
import { appReadyState } from 'store/app';
import { NumericValue, toBigNumber } from 'utils/formatters/number';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import axios from 'axios';

type QuoteData = {
	toTokenAmount: NumericValue;
};

const use1InchQuoteQuery = (
	fromTokenAddress: string,
	toTokenAddress: string,
	amount: NumericValue,
	options?: QueryConfig<QuoteData>
) => {
	const isAppReady = useRecoilValue(appReadyState);
	const isWalletConnected = useRecoilValue(isWalletConnectedState);
	const walletAddress = useRecoilValue(walletAddressState);
	const network = useRecoilValue(networkState);

	return useQuery<QuoteData>(
		QUERY_KEYS['1Inch'].quote(walletAddress ?? '', network?.id!),
		async () => {
			const response = await axios.get('https://api.1inch.exchange/v2.0/quote', {
				params: {
					fromTokenAddress,
					toTokenAddress,
					amount: parseUnits(amount.toString(), 18).toString(),
				},
			});

			const toTokenAmountString: string = response.data.toTokenAmount;
			const toTokenAmount: NumericValue = toBigNumber(formatEther(toTokenAmountString));
			return {
				toTokenAmount,
			};
		},
		{
			enabled: isAppReady && isWalletConnected,
			...options,
		}
	);
};

export default use1InchQuoteQuery;
