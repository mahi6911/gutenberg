/**
 * External dependencies
 */
// import { fetchRequest } from 'react-native-gutenberg-bridge';
import { fetchRequest, addMention } from 'react-native-gutenberg-bridge';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
	AlignmentToolbar,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import {Button} from "react-native";

const name = 'core/paragraph';

function ParagraphBlock( {
	attributes,
	mergeBlocks,
	onReplace,
	setAttributes,
	style: oldStyle,
} ) {
	const { align, content, placeholder, style } = attributes;

	const styles = {
		...oldStyle,
		color: style && style.color && style.color.text,
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
				{/*<Button*/}
				{/*	title={ "@" }*/}
				{/*	onPress={ () => {*/}
				{/*		addMention()*/}
				{/*			.then( mentionUserId => {*/}
				{/*				console.log( `mentioned user id: ${ mentionUserId }` )*/}
				{/*				setAttributes( {*/}
				{/*					content: `${ content }@${ mentionUserId }`*/}
				{/*				})*/}
				{/*			})*/}
				{/*	}}*/}
				{/*/>*/}
			</BlockControls>
			<RichText
				identifier="content"
				tagName="p"
				value={ content }
				deleteEnter={ true }
				style={ styles }
				onChange={ ( nextContent ) => {
					setAttributes( {
						content: nextContent,
					} );
				} }
				onSplit={ ( value ) => {
					if ( ! value ) {
						return createBlock( name );
					}

					return createBlock( name, {
						...attributes,
						content: value,
					} );
				} }
				onMerge={ mergeBlocks }
				onReplace={ onReplace }
				onRemove={ onReplace ? () => onReplace( [] ) : undefined }
				placeholder={ placeholder || __( 'Start writing…' ) }
				textAlign={ align }
			/>
		</>
	);
}

export default ParagraphBlock;
