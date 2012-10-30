#define BUILDING_NODE_EXTENSION
#include <ctype.h>
#include "svg_size_hack.h"
#include <string.h>
#include <stdio.h>


SvgSizeHack::SvgSizeHack() {
	state = WHITESPACE;
	quote = 0;
	bufpos = 0;
	isSVGTag = false;
	attribute = ATTR_UNKNOWN;
	finished = false;
}

SvgSizeHack::~SvgSizeHack() {
}

void SvgSizeHack::parse(unsigned char *chunk, int length) {
	unsigned char *p = chunk;
	for(int i = 0; i < length; i++, p++) {
		if(this->finished)
			return;
		switch(state) {
		case WHITESPACE:
			if(*p == '<')
				state = TAG_START;
			break;
		case TAG_START:
			state = TAG_NAME;
			break;
		case TAG_NAME:
			if(isspace(*p) || *p == '>') {
				this->isSVGTag = strcmp(buffer, "svg") == 0;
				bufpos = 0;
				state = *p == '>' ? WHITESPACE : TAG_WHITESPACE;
			}
			break;
		case TAG_WHITESPACE:
			if(*p == '>')
				state = WHITESPACE;
			else if(!isspace(*p))
				state = ATTRIBUTE_NAME;
			break;
		case ATTRIBUTE_NAME:
			if(*p == '=') {
				if(strcmp("width", this->buffer) == 0)
					this->attribute = ATTR_WIDTH;
				else if(strcmp("height", this->buffer) == 0)
					this->attribute = ATTR_HEIGHT;
				else
					this->attribute = ATTR_UNKNOWN;
				bufpos = 0;
				state = ATTRIBUTE_EQUALS;
			}
			break;
		case ATTRIBUTE_EQUALS:
			state = ATTRIBUTE_OPEN_QUOTES;
			quote = *p;
			break;
		case ATTRIBUTE_OPEN_QUOTES:
			state = ATTRIBUTE_VALUE;
			break;
		case ATTRIBUTE_VALUE:
			if(this->attribute != ATTR_UNKNOWN && this->isSVGTag && buffer[bufpos-1] == 'p' && *p == 't') {
				*p = 'x';
				this->widthDone |= this->attribute == ATTR_WIDTH;
				this->heightDone |= this->attribute == ATTR_HEIGHT;
				this->finished = this->widthDone && this->heightDone;
			}
			else if(*p == quote) {
				state = ATTRIBUTE_CLOSE_QUOTES;
				bufpos = 0;
			}
			break;
		case ATTRIBUTE_CLOSE_QUOTES:
			state = *p == '>' ? WHITESPACE : TAG_WHITESPACE;
		}
		switch(state) {
		case TAG_NAME:
		case ATTRIBUTE_NAME:
		case ATTRIBUTE_VALUE:
			this->addBuffer(*p);
			break;
		default:
			break;
		}
	}
}