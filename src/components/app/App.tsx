import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplySettings = (settings: ArticleStateType) => {
		setAppliedSettings(settings);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApplySettings}
				currentSettings={appliedSettings}
			/>
			<Article />
		</main>
	);
};
