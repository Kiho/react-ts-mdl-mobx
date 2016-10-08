import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import { ReactComponentBase, BasicComponent } from './react-component';
import { Button } from './button';

import { ElementProps, ButtonProps, MenuProps } from 'mdl-react';

interface IconProps extends ElementProps {
}

interface IconButtonProps extends ButtonProps {
}

export class Icon extends ReactComponentBase<IconProps, any> {
    render() {
        var { className, name } = this.props;
        var classes = classNames('material-icons', className);

        return <i {...this.props} className={classes} name="">{name}</i>;
    }
}

export class BadgeButton extends ReactComponentBase<IconButtonProps, any>  {
    render() {
        var { className, name, id, onClick } = this.props;
        var classes = classNames('material-icons', className);

        return (
            <Button className='mdl-button--icon' onClick={onClick} id={id}>
                <i {...this.props} onClick={null} className={classes}>{name}</i>;
                </Button>
        );
    }
}

export class IconButton extends ReactComponentBase<IconButtonProps, any>  {
    render() {
        var { className, name, id, onClick } = this.props;
        var classes = classNames('mdl-button--icon', className);

        return (
            <Button className={classes} onClick={onClick} id={id}>
                <Icon name={name} className="f15"/>
                </Button>
        );
    }
}

export class MenuItem extends BasicComponent {
    constructor(props) {
        super(props);

        this.element = 'li';
        this.defaultClassName = 'mdl-menu__item';
    }
}

export class Menu extends ReactComponentBase<MenuProps, any> {
    static defaultProps = {
        ripple: true,
        align: 'left',
        valign: 'bottom'
    }

    render() {
        var { align, className, ripple, target, valign } = this.props;

        var classes = classNames('mdl-menu mdl-js-menu', {
            [`mdl-menu--${valign}-${align}`]: true,
            'mdl-js-ripple-effect': ripple
        }, className);

        return (
            <ul className={classes} htmlFor={target}>
                {this.props.children}
                </ul>
        );
    }
}