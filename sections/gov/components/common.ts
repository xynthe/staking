import styled from 'styled-components';
import { FlexDivCol, FlexDivColCentered, FlexDivRowCentered } from 'styles/common';
import Button from 'components/Button';

export const Container = styled.div`
	background-color: ${(props) => props.theme.colors.navy};
	padding: 20px;
`;

export const InputContainer = styled(FlexDivColCentered)`
	background: ${(props) => props.theme.colors.black};
	position: relative;
	width: 100%;
	height: 100%;
	padding: 16px;
	margin-bottom: 24px;
`;

export const HeaderRow = styled(FlexDivRowCentered)`
	justify-content: space-between;
	width: 100%;
	padding: 8px;
`;

export const Header = styled.p`
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.extended};
	font-size: 12px;
	text-align: center;
`;

export const Blockie = styled.img`
	width: 25px;
	height: 25px;
	border-radius: 12.5px;
	margin-right: 10px;
`;

export const DataRow = styled(FlexDivRowCentered)`
	margin-bottom: 8px;
	border-bottom: 0.5px solid ${(props) => props.theme.colors.grayBlue};
	justify-content: space-between;
	padding: 8px;
`;

export const Card = styled.div`
	background-color: ${(props) => props.theme.colors.navy};
	margin-bottom: 16px;
	padding: 16px;
	width: 400px;
`;

export const Subtitle = styled.p`
	font-family: ${(props) => props.theme.fonts.interBold};
	font-size: 12px;
	text-transform: uppercase;
	color: ${(props) => props.theme.colors.gray};
`;

export const LeftCol = styled(FlexDivCol)`
	height: 100%;
	width: 700px;
	margin-right: 8px;
`;
export const RightCol = styled(FlexDivCol)`
	height: 100%;
	width: 400px;
	margin-left: 8px;
`;

export const StyledCTA = styled(Button)`
	text-transform: uppercase;
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	font-size: 12px;
	width: 100%;
	margin: 4px 0px;
`;

export const MaxHeightColumn = styled(FlexDivCol)`
	max-height: 400px;
	overflow: scroll;
`;