import { Synths } from 'constants/currency';
import { WEEKS_IN_YEAR } from 'constants/date';
import useExchangeRatesQuery from 'queries/rates/useExchangeRatesQuery';
import { ShortRewardsData } from 'queries/shorts/types';
import useSBTCShortsQuery from 'queries/shorts/useSBTCShortsQuery';

type SRData = {
	[name: string]: {
		APR: number;
		OI: number;
		data: ShortRewardsData | undefined;
	};
};

const useShortRewardsData = (): SRData => {
	const exchangeRatesQuery = useExchangeRatesQuery();
	const SNXRate = exchangeRatesQuery.data?.SNX ?? 0;
	const usesBTCRewards = useSBTCShortsQuery();

	const sBTCOpenInterestUSD = usesBTCRewards.data?.openInterestUSD ?? 0;

	const sBTCAPR =
		usesBTCRewards.data?.distribution && SNXRate && sBTCOpenInterestUSD
			? ((usesBTCRewards.data.distribution * SNXRate) / sBTCOpenInterestUSD) * WEEKS_IN_YEAR
			: 0;

	return {
		[Synths.sBTC]: {
			APR: sBTCAPR,
			OI: sBTCOpenInterestUSD,
			data: usesBTCRewards.data,
		},
	};
};

export default useShortRewardsData;
