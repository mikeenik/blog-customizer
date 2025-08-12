import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useState, useEffect } from 'react';
import {
	defaultArticleState,
	fontSizeOptions,
	fontFamilyOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply?: (settings: typeof defaultArticleState) => void;
	currentSettings?: typeof defaultArticleState;
};

export const ArticleParamsForm = ({ onApply, currentSettings = defaultArticleState }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(currentSettings);

	useEffect(() => {
		if (isOpen) {
			setFormState(currentSettings);
		}
	}, [currentSettings, isOpen]);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleApply = () => {
		onApply?.(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply?.(defaultArticleState);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside className={`${styles.container} ${isOpen ? styles.open : ''}`}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
						title='Цвет шрифта'
					/>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
						title='Ширина контейнера'
					/>
					<div className={styles.bottomContainer}>
					<Button title='Сбросить' htmlType='button' type='clear' onClick={handleReset} />
					<Button title='Применить' htmlType='button' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
