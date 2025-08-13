import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
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

export const ArticleParamsForm = ({
	onApply,
	currentSettings = defaultArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(currentSettings);
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isMenuOpen) {
			setFormState(currentSettings);
		}
	}, [currentSettings, isMenuOpen]);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
	});

	const handleToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleApply = () => {
		onApply?.(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply?.(defaultArticleState);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.open]: isMenuOpen })}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<div className={styles.titleWrapper}>
						<Text as='h2' size={31} weight={800} uppercase align='left'>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
					</div>
					<div className={styles.formGrid}>
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
					</div>
					<div className={styles.formGrid}>
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
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
