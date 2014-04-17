/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference path="../../lib/tslint.d.ts" />

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Type decoration of 'any' is forbidden.";

    public apply(syntaxTree: TypeScript.SyntaxTree): Lint.RuleFailure[] {
        return this.applyWithWalker(<Lint.RuleWalker>(new NoAnyWalker(syntaxTree, this.getOptions())));
    }
}

class NoAnyWalker extends Lint.RuleWalker {

    public visitToken(token : TypeScript.ISyntaxToken): void {
        this.handleToken(token);
        super.visitToken(token);
    }

    private handleToken(token: TypeScript.ISyntaxToken) {
        if (token.kind() === TypeScript.SyntaxKind.AnyKeyword) {
            var position = this.position() + token.leadingTriviaWidth();
            this.addFailure(this.createFailure(position, token.width(), Rule.FAILURE_STRING));
        }
    }
}
